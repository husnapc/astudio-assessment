import { useState, useEffect } from 'react';
import FilterOption from '../components/FilterOption';
import Entries from '../components/Entries';
import Search from '../components/Search';

interface FilterProps {
  entries: number;
  setEntries: (value: number) => void;
  setSearchQuery: (query: string) => void;
  filters: { id: number; name: string }[];
  itemsByFilter: { [key: string]: any[] };
  onFilterChange: (filters: { [key: string]: string }) => void;
}

function Filter({
  entries,
  setEntries,
  setSearchQuery,
  filters,
  itemsByFilter,
  onFilterChange,
}: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);  
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({}); 
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({}); 

 
  const getItemDisplayKey = (filterName: string) => {
    switch (filterName) {
      case 'Brand':
        return 'brand';
      case 'Title':
        return 'title';
      case 'Category':
        return 'category';
      default:
        return filterName.toLowerCase();
    }
  };

  const handleFilterSelect = (filter: string, selectedItem: any) => {
    const key = getItemDisplayKey(filter);
    const selectedValue = selectedItem && selectedItem[key] ? String(selectedItem[key]) : '';
    

    const newFilterValues = {
      ...filterValues,
      [filter]: selectedValue,
    };
    setFilterValues(newFilterValues);
    onFilterChange(newFilterValues); 
    setActiveFilter(null); 
  };

  const handleSearchChange = (filter: string, term: string) => {
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [filter]: term,
    }));
  };

 
  const getFilteredItems = (filterName: string) => {
    const searchTerm = searchTerms[filterName]?.toLowerCase() || '';
    const items = itemsByFilter[filterName];
    return items.filter((item) => {
      const label = getItemDisplayKey(filterName) ? String(item[getItemDisplayKey(filterName)]) : String(item);
      return label.toLowerCase().includes(searchTerm);
    });
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveFilter(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex gap-4 justify-between lg:w-[50%] md:w-[70%] my-5">
      <Entries entries={entries} setEntries={setEntries} />
      <Search onSearch={setSearchQuery} />

      <div className="flex border-t-0 border-b-0 border-r-0 border-2 border-l-gray ml-4 my-4">
        {filters.map((filter) => (
          <FilterOption
            key={filter.id}
            items={getFilteredItems(filter.name)} 
            itemDisplayKey={getItemDisplayKey(filter.name)}
            onItemSelect={(item) => handleFilterSelect(filter.name, item)}
            placeholder={filter.name}
            isActive={activeFilter === filter.name}
            setActiveFilter={() => setActiveFilter(filter.name)}
            closeFilter={() => setActiveFilter(null)}
            value={filterValues[filter.name] || ''} 
            searchTerm={searchTerms[filter.name] || ''} 
            onSearchChange={(term) => handleSearchChange(filter.name, term)} 
          />
        ))}
      </div>
    </div>
  );
}

export default Filter;
