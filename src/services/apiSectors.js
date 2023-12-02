import supabase from "@/services/supabase.js";

export const getSectors = async () => {
  const { data: rawSectors } = await supabase.from("sectors").select("*");
  const sectors = organizeSectors(rawSectors);

  return { sectors };
};

const organizeSectors = (sectors) => {
  const topParents = sectors
    .filter((item) => item.parent === null)
    .map((item) => ({ ...item, children: [] }));

  const sortedData = sectors
    .filter((item) => item.parent !== null)
    .sort((a, b) => b.parent - a.parent)
    .map((item) => ({ ...item, children: [] }));

  const result = [...sortedData, ...topParents];

  for (const child of sortedData) {
    const resultIndex = result.findIndex(
      (parent) => parent.id === child.parent,
    );
    const itemIndex = result.findIndex((item) => item.id === child.id);
    result[resultIndex].children.push(result[itemIndex]);
    result.splice(itemIndex, 1);
  }

  return result;
};
