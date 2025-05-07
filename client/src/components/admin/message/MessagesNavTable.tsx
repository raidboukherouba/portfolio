interface MessagesNavTableProps {
  title: string;
  total?: number;
  limit: number;
  searchTerm: string;
  onLimitChange: (limit: number) => void;
  onSearchChange: (term: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  filters: {
    readStatus: string;
    startDate: string;
    endDate: string;
  };
  onFilterChange: (name: string, value: string) => void;
  onFilterSubmit: (e: React.FormEvent) => void;
  onResetFilters: () => void;
}

const MessagesNavTable = ({ 
  title,  
  limit, 
  searchTerm,
  onLimitChange,
  onSearchChange,
  onSearchSubmit,
  filters,
  onFilterChange,
  onFilterSubmit,
  onResetFilters
}: MessagesNavTableProps) => {
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(Number(e.target.value));
  };

  return (
    <div className="flex flex-col">
      {/* Header and Search Row */}
      <div className="flex flex-col md:flex-row items-center justify-between p-2 mb-4 bg-gray-50 dark:bg-gray-900 gap-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="items-per-page" className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                Items per page:
              </label>
              <select
                id="items-per-page"
                value={limit}
                onChange={handleLimitChange}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white px-2 py-1 text-sm cursor-pointer"
              >
                {[2, 10, 20, 50].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={onSearchSubmit} className="flex gap-2 w-full md:max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or email..."
            className="flex-1 px-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="px-2 rounded-sm bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
          >
            Search
          </button>
        </form>
      </div>
      
      {/* Filter Form */}
      <form onSubmit={onFilterSubmit} className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2 mb-4">
        <div>
          <label htmlFor="readStatus" className="block text-sm font-medium mb-1 dark:text-gray-300">
            Status
          </label>
          <select
            id="readStatus"
            value={filters.readStatus}
            onChange={(e) => onFilterChange('readStatus', e.target.value)}
            className="w-full px-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium mb-1 dark:text-gray-300">
            From Date
          </label>
          <input
            type="date"
            id="startDate"
            value={filters.startDate}
            onChange={(e) => onFilterChange('startDate', e.target.value)}
            className="w-full px-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium mb-1 dark:text-gray-300">
            To Date
          </label>
          <input
            type="date"
            id="endDate"
            value={filters.endDate}
            onChange={(e) => onFilterChange('endDate', e.target.value)}
            className="w-full px-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        
        <div className="flex items-end gap-4">
          <button
            type="submit"
            className="w-full px-3 rounded-sm bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
          >
            Filter
          </button>
          <button
            type="button"
            onClick={onResetFilters}
            className="w-full px-3 rounded-sm bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default MessagesNavTable;