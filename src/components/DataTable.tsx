interface DataTableProps{
    columns:string[];
    data:any[];
}
function DataTable({columns,data}:DataTableProps) {
  return (
    <div className='overflow-x-auto'>
        <table className='table-auto w-full'>
            <thead className="bg-blue">
                <tr>
                    {columns.map((column,index)=>(
                    <th key={index} className='px-4 py-2 border border-gray whitespace-nowrap text-[14px] font-semibold'>{column}</th>
                    )
                   ) }
                </tr>
            </thead>                        
            <tbody>
            {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 border border-gray text-sm"
                  >
                    {row[column.toLowerCase()] || 'N/A'}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
            </tbody>
        </table> 
      
    </div>
  )
}

export default DataTable
