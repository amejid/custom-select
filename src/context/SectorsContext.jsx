import { createContext, useContext, useEffect, useState } from "react";
import { getSectors } from "@/services/apiSectors.js";

const SectorsContext = createContext({ sectors: [] });

let flag = true;

const SectorsProvider = ({ children }) => {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      const { sectors: nestedSectors } = await getSectors();

      setSectors(flattenNestedData(nestedSectors));
    };

    const flattenNestedData = (data) => {
      let flattenedData = [];

      const flatten = (item, level) => {
        flattenedData.push({
          key: item.id,
          value: item.value,
          description: item.description,
          disabled: item.children.length > 0,
          level: level,
        });

        if (item.children && item.children.length > 0) {
          item.children.forEach((child) => flatten(child, level + 1));
        }
      };

      data.forEach((d) => flatten(d, 0));

      return flattenedData;
    };

    if (flag) {
      handleFetch();
      flag = false;
    }
  }, []);

  return (
    <SectorsContext.Provider value={{ sectors }}>
      {children}
    </SectorsContext.Provider>
  );
};

const useSectors = () => {
  const context = useContext(SectorsContext);
  if (context === undefined)
    throw new Error("SectorsContext was used outside SectorsProvider");
  return context;
};

export { SectorsProvider, useSectors };
