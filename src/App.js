import './App.css';
import { useState } from "react";
import { Main } from "./components/main";

function App() {
  const [tableSize, setTableSize] = useState(10);
  const handleTableSizeChange = (e) => {
    setTableSize(+e.target.value || 10);
  };

  return (
    <div className="App">
      <div className="size-field">
        <label>Table Size</label>
        <input
          type="number"
          min="10"
          max="30"
          value={tableSize}
          onChange={handleTableSizeChange}
        />
        x{tableSize}
      </div>
      <Main size= {tableSize} />
    </div>
  );
}

export default App;
