import { useEffect, useState } from 'react';
import './App.css';
import { getSectors } from './services/apiSectors.js';

function App() {
  const [sectors, setSectors] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      const { sectors: nestedSectors } = await getSectors();

      setSectors(nestedSectors);
    };

    handleFetch();
  }, []);

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

  const flattenedData = flattenNestedData(sectors);

  const handleSelectChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };

  console.log(selectedOptions);

  return (
    <select multiple size={10} onChange={handleSelectChange}>
      {flattenedData.map((sector) => (
        <option
          key={sector.key}
          value={sector.value}
          disabled={sector.disabled}
          style={{ marginLeft: `${sector.level * 20}px` }}
        >
          {sector.description}
        </option>
      ))}
    </select>
  );
}

export default App;
