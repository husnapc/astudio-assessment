import { useState } from "react";

interface EntriesProps {
  entries: number; 
  setEntries: (value: number) => void;
}

function Entries({ entries, setEntries }: EntriesProps) {
  const [value, setValue] = useState(entries); 

  const handleSelectChange = (event:any) => {
    const selectedValue = parseInt(event.target.value); 
    setValue(selectedValue); 
    setEntries(selectedValue);
  };

  return (
    <div className="flex gap-3 pr-6 my-4 border-t-0 border-b-0 border-l-0 border-2 border-r-gray text-sm">
      <select value={value} onChange={handleSelectChange}>
        <option  value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <p className="flex items-center">Entries</p>
    </div>
  );
}

export default Entries;
