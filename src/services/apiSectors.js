import supabase from "./supabase.js";

export const getSectors = async () => {
  const { data: sectors, error } = await supabase.from("sectors").select("*");

  return { sectors };
};
