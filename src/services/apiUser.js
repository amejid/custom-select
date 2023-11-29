import supabase from "@/services/supabase.js";

export const getUser = async (userId) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", +userId);

  if (error) {
    console.error(error);
    return null;
  }

  return { user: user[0] };
};

export const getUserSectors = async (userId) => {
  const { data: userSectors, error } = await supabase
    .from("user-sectors")
    .select("sector_id")
    .eq("user_id", userId);

  const mappedSectors = userSectors.map((sec) => sec["sector_id"]);

  if (error) {
    console.error(error);
    return [];
  }

  return { userSectors: mappedSectors };
};

export const saveNewUser = async ({ name, agreed, selected }) => {
  const { data: user, error } = await supabase
    .from("users")
    .insert([{ name: name, agreed: agreed }])
    .select();

  if (error) {
    console.log(error);
    return null;
  }

  await saveUserSectors({
    userId: user[0].id,
    selected,
  });

  return { userId: user[0].id };
};

export const updateUser = async ({ name, agreed, selected, userId }) => {
  await supabase
    .from("users")
    .update({ name, agreed })
    .eq("id", userId)
    .select();

  await saveUserSectors({ userId, selected });
};

export const saveUserSectors = async ({ userId, selected }) => {
  const selectedSectors = selected.map((sel) => ({
    user_id: userId,
    sector_id: sel,
  }));

  const { error } = await supabase
    .from("user-sectors")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.log(error);
    return;
  }

  await supabase
    .from("user-sectors")
    .insert([...selectedSectors])
    .select();
};
