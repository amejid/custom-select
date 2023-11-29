export const formatSectors = (sectors) => {
  return sectors.map((sector) => ({
    value: sector.key,
    label: sector.description,
    disabled: sector.disabled,
    level: sector.level,
  }));
};
