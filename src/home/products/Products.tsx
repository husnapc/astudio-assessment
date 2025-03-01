import { useState, useEffect } from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../redux/dataSlice';
import DataTable from '../../components/DataTable';
import Filter from '../../containers/Filter';
import Pagination from '../../components/Pagination';
import { Tabs } from "radix-ui";

function Products() {
  const dispatch: AppDispatch = useDispatch();
  const [entries, setEntries] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
 
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});

  const { columns, data, status, error } = useSelector((state: RootState) => state.data);

  const filters = [
    { id: 1, name: 'Brand' },
    { id: 2, name: 'Title' },
    { id: 3, name: 'Category' },
  ];

  const totalPages = Math.ceil(100 / entries);

  useEffect(() => {
    const skip = (currentPage - 1) * entries;
    dispatch(
      fetchData({
        apiUrl: 'https://dummyjson.com/products',
        limit: entries,
        skip: skip,
      })
    );
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

  const laptopsData = data.filter((row: any) =>
    row.category.toLowerCase().includes('laptops')
  );

  const itemsByFilter = {
    Title: data.map((item: any) => ({ title: item.title })),
    Brand: data.map((item: any) => ({ brand: item.brand })),
    Category: data.map((item: any) => ({ category: item.category })),
  };

  return (
    <div className='font-display'>
      <h1 className="text-start mb-4 font-display">
        Home /{' '}
        <span className="relative inline-block before:absolute before:-inset-[-4px] before:block before:-skew-y-3 before:bg-yellow">
          <span className="relative font-semibold">Products</span>
        </span>
      </h1>

      <Filter
        entries={entries}
        setEntries={setEntries}
        setSearchQuery={setSearchQuery}
        filters={filters}
        itemsByFilter={itemsByFilter}
        onFilterChange={setSelectedFilters}
      />
      
{/* I used radix Ui external component here to use tab */}

      <Tabs.Root defaultValue="tab1">
        <Tabs.List
          className="flex flex-shrink-0 border-b border-[var(--mauve-6)] w-1/4 mb-4"
          aria-label="Manage your account"
        >
          <Tabs.Trigger
            value="tab1"
            className="[font-family:inherit] bg-white px-[20px] h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-[var(--mauve-11)] select-none
             first:rounded-tl-[6px] last:rounded-tr-[6px]
             hover:text-[var(--violet-11)]
             data-[state=active]:text-[var(--violet-11)] data-[state=active]:shadow-[inset_0_-1px_0_0_currentColor,0_1px_0_0_currentColor]
             focus:relative focus:shadow-[0_0_0_2px_black]"
          >
            All
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            className="[font-family:inherit] bg-white px-[20px] h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-[var(--mauve-11)] select-none
             first:rounded-tl-[6px] last:rounded-tr-[6px]
             hover:text-[var(--violet-11)]
             data-[state=active]:text-[var(--violet-11)] data-[state=active]:shadow-[inset_0_-1px_0_0_currentColor,0_1px_0_0_currentColor]
             focus:relative focus:shadow-[0_0_0_2px_black]"
          >
            Laptops
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="tab1">
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {status === 'succeeded' && data.length > 0 && (
            <DataTable columns={columns} data={filteredData} />
          )}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </Tabs.Content>

        <Tabs.Content value="tab2">
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {status === 'succeeded' && laptopsData.length > 0 && (
            <DataTable columns={columns} data={laptopsData} />
          )}
          {laptopsData.length === 0 && status === 'succeeded' && <p>No laptops found in this page.</p>}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export default Products;
