import { useEffect, useState } from "react";
import "./App.css";
import { getSectors } from "./services/apiSectors.js";

function App() {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      const { sectors } = await getSectors();

      function sortDataByParent(data) {
        const sortedData = [];
        const idToIndex = {};

        // Build a dictionary to map IDs to their index in the array
        data.forEach((item, index) => {
          idToIndex[item.id] = index;
        });

        // Iterate through the data and insert items into the sorted array
        data.forEach((item) => {
          sortedData.push(item);
          if (
            item.parent !== null &&
            Object.prototype.hasOwnProperty.call(idToIndex, item.parent)
          ) {
            const parentIndex = idToIndex[item.parent];
            sortedData.splice(parentIndex + 1, 0, item);
          }
        });

        return sortedData;
      }

      const sortedData = sortDataByParent(sectors);

      setSectors(sortedData);
    };

    handleFetch();
  }, []);

  return (
    <select>
      {sectors.map((sector) => (
        <option key={sector.id} value={sector.value}>
          {sector.description}
        </option>
      ))}
    </select>
  );
}

export default App;
