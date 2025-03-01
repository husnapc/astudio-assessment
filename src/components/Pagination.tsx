interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

function Pagination({ currentPage, setCurrentPage, totalPages }: PaginationProps) {
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const getVisiblePages = () => {
    const visiblePages: (number | string)[] = [];

    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        visiblePages.push(i);
      }
      visiblePages.push("...");
      visiblePages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      visiblePages.push(1);
      visiblePages.push("...");
      for (let i = totalPages - 4; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      visiblePages.push(1);
      visiblePages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        visiblePages.push(i);
      }
      visiblePages.push("...");
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  return (
    <div className="flex gap-6 items-center justify-center my-8 overflow-x-auto">
      <img
        src="/arrow.png"
        alt="Previous"
        className="w-4 h-3 cursor-pointer"
        onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
      />
      {getVisiblePages().map((page, index) =>
        page === "..." ? (
          <span key={index} className="text-sm">...</span>
        ) : (
          <span
            key={index}
            className={`text-sm cursor-pointer ${currentPage === page ? 'font-semibold pb-2' : ''}`}
            onClick={() => handlePageClick(page as number)}
          >
            {page}
          </span>
        )
      )}
      <img
        src="/arrow.png"
        alt="Next"
        className="w-4 h-3 transform rotate-180 cursor-pointer"
        onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}
      />
    </div>
  );
}

export default Pagination;
