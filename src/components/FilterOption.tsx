import React from 'react';

interface FilterOptionProps {
  items: { [key: string]: any }[];
  itemDisplayKey?: string;
  onItemSelect: (item: { [key: string]: any } | null) => void;
  placeholder?: string;
  isActive: boolean;
  setActiveFilter: () => void;
  closeFilter: () => void;
  value: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

function FilterOption({
  items,
  itemDisplayKey = '',
  onItemSelect,
  placeholder = 'Select...',
  isActive,
  setActiveFilter,

  value,
  searchTerm,
  onSearchChange,
}: FilterOptionProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm || value}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="w-1/2 rounded focus:outline-none text-sm"
        onFocus={setActiveFilter}
      />
      {/* Arrow Icon */}
      <img
        src="/arrow-down.svg"
        alt="arrow-down"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer"
        onClick={setActiveFilter}
      />
      {/* Dropdown Suggestions */}
      {isActive && items.length > 0 && (
        <ul className="absolute w-[280px] bg-white border border-gray-300 mt-1 py-1 px-2 rounded shadow-lg max-h-40 overflow-y-auto z-10">
          {items.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onMouseDown={() => onItemSelect(item)} 
            >
              {itemDisplayKey ? String(item[itemDisplayKey]) : String(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterOption;
