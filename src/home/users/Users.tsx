import { useEffect, useState } from 'react';
import { fetchData } from '../../redux/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import Filter from '../../containers/Filter'; 

function Users() {
  const dispatch: AppDispatch = useDispatch();
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
   const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});
  const filters = [
    { id: 1, name: 'Name' },
    { id: 2, name: 'Email' },
    { id: 3, name: 'Birth Date' },
    { id: 4, name: 'Gender' },
  ];
 
  const { columns, data, status, error } = useSelector((state: RootState) => state.data);
  useEffect(() => {
    const skip = (currentPage - 1) * entries;
    
    if (isNaN(skip)) {
      console.error('Invalid skip value:', skip);
      return;
    }
  
    dispatch(fetchData({
      apiUrl: 'https://dummyjson.com/users',
      limit: entries,
      skip: skip,
    }));
  }, [dispatch, currentPage, entries]);
  
  const filteredData = data.filter((row: any) => {
    const searchMatch = Object.values(row).some((value) =>
      (value as string).toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filterMatch = Object.entries(selectedFilters).every(
      ([filterName, selectedValue]) => {
        if (!selectedValue) return true; 
        const key = filterName.toLowerCase();
        return String(row[key]).toLowerCase().includes(selectedValue.toLowerCase());
      }
    );
  
    return searchMatch && filterMatch;
  });  
  const totalPages = Math.ceil(100 / entries); 
  const itemsByFilter = {
    Name: data.map((item: any) => ({ firstName: item.firstName })),
   Email: data.map((item: any) => ({email: item.email})),
    'Birth Date': data.map((item: any) => ({ birthDate: item.birthDate })),
    Gender: data.map((item: any) => ({ gender: item.gender })),
  };
  return (
    <div className='font-display'>
      <h1 className='text-start mb-4 font-display'>
        Home /{' '}
        <span className="relative inline-block before:absolute before:-inset-[-4px] before:block before:-skew-y-3 before:bg-yellow">
          <span className="relative font-semibold">Users</span>
        </span>
      </h1>

      {/* Filter component */}
      <Filter
        entries={entries}
        setEntries={setEntries}
        setSearchQuery={setSearchQuery}
        filters={filters}
        itemsByFilter={itemsByFilter}
        onFilterChange={setSelectedFilters}
      />

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && data.length > 0 && (
        <DataTable columns={columns} data={filteredData} />
      )}

      {/* Pagination */}
      <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
    </div>
  );
}

export default Users;
