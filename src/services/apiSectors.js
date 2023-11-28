import supabase from './supabase.js';

export const getSectors = async () => {
  const topLevelSectors = await fetchSectors(null);
  return { sectors: topLevelSectors };
};

const fetchSectors = async (parentId) => {
  let supabaseQuery = supabase
    .from('sectors')
    .select('id, value, description, parent')
    .order('value', { ascending: true });

  if (parentId === null) {
    supabaseQuery = supabaseQuery.is('parent', parentId);
  } else {
    supabaseQuery = supabaseQuery.eq('parent', parentId);
  }

  const { data: sectors, error } = await supabaseQuery;

  if (error) {
    console.error(error);
    return [];
  }

  const sectorsWithChildren = await Promise.all(
    sectors.map(async (sector) => {
      const children = await fetchSectors(sector.id);
      return { ...sector, children };
    })
  );

  return sectorsWithChildren;
};
