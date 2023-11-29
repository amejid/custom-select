import supabase from "@/services/supabase.js";

export const getSectors = async () => {
  const topLevelSectors = await fetchSectors(null);
  return { sectors: topLevelSectors };
};

const fetchSectors = async (parentId) => {
  let supabaseQuery = supabase
    .from("sectors")
    .select("id, value, description, parent");

  if (parentId === null) {
    supabaseQuery = supabaseQuery.is("parent", parentId);
  } else {
    supabaseQuery = supabaseQuery.eq("parent", parentId);
  }

  const { data: sectors, error } = await supabaseQuery.order("value", {
    ascending: true,
  });

  if (error) {
    console.error(error);
    return [];
  }

  return await Promise.all(
    sectors.map(async (sector) => {
      const children = await fetchSectors(sector.id);
      return { ...sector, children };
    }),
  );
};
