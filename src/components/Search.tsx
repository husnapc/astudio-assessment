import React, { useState, useEffect, useRef } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

function Search({ onSearch }: SearchProps) {
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLDivElement>(null); 

  const handleSearchClick = () => {
    setShowInput(!showInput);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowInput(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={inputRef} className="relative flex items-center gap-2 ">
      <img
        src="/search.png"
        alt="search"
        className="w-4 h-4 m-3 cursor-pointer z-20 "
        onClick={handleSearchClick}
      />
      {showInput && (
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search..."
          className="absolute z-10 border border-gray-300 p-1 pl-8 rounded bg-white"
        />
      )}
    </div>
  );
}

export default Search;
