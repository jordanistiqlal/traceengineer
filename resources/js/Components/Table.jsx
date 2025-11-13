import { useState, useMemo, useEffect } from 'react';

export default function Table({ 
    data = [], 
    columns = [],
    search = true,
    sort = true,
    searchPlaceholder = "Search...",
    emptyMessage = "No data available",
    pagination = true,
    perPage = 10,
    perPageOptions = [5, 10, 25, 50, 100]
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(perPage);

    // Fungsi untuk sorting
    const handleSort = (key) => {
        if (!sort) return;
        
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Filter dan sort data
    const filteredAndSortedData = useMemo(() => {
        let filtered = [...data];

        // Filter berdasarkan search
        if (search && searchTerm) {
            filtered = filtered.filter(item => {
                const searchLower = searchTerm.toLowerCase();
                return columns.some(col => {
                    if (!col.searchable) return false;
                    const value = item[col.key]?.toString().toLowerCase() || '';
                    return value.includes(searchLower);
                });
            });
        }

        // Sort data
        if (sort && sortConfig.key) {
            filtered.sort((a, b) => {
                const aValue = a[sortConfig.key] || '';
                const bValue = b[sortConfig.key] || '';
                
                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filtered;
    }, [data, searchTerm, sortConfig, columns, search, sort]);

    // Reset ke halaman 1 ketika search atau perPage berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, itemsPerPage]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = pagination ? filteredAndSortedData.slice(startIndex, endIndex) : filteredAndSortedData;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
    };

    // Generate page numbers untuk pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    // Icon untuk sorting
    const SortIcon = ({ column }) => {
        if (!sort) return null;
        
        if (sortConfig.key !== column) {
            return (
                <svg className="w-4 h-4 ml-1 inline opacity-30" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 12l5 5 5-5H5zm10-4l-5-5-5 5h10z"/>
                </svg>
            );
        }
        return sortConfig.direction === 'asc' ? (
            <svg className="w-4 h-4 ml-1 inline" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 12l5 5 5-5H5z"/>
            </svg>
        ) : (
            <svg className="w-4 h-4 ml-1 inline" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8l-5-5-5 5h10z"/>
            </svg>
        );
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">
                    {columns[0]?.title || 'Data Table'}
                </h2>
                
                {/* Search Box */}
                {search && (
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
                        />
                        <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
                {pagination ? (
                    <>Showing {filteredAndSortedData.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredAndSortedData.length)} of {filteredAndSortedData.length} records</>
                ) : (
                    <>Showing {filteredAndSortedData.length} records</>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-gray-600">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800 uppercase text-xs tracking-wider">
                            {columns.map((col, index) => (
                                <th 
                                    key={col.key}
                                    className={`py-3 px-4 ${
                                        col.sortable && sort ? 'cursor-pointer hover:bg-gray-200 transition' : ''
                                    } ${index === 0 ? 'rounded-tl-xl' : ''} ${
                                        index === columns.length - 1 ? 'rounded-tr-xl' : ''
                                    } ${col.align === 'center' ? 'text-center' : ''}`}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                >
                                    {col.label}
                                    {col.sortable && <SortIcon column={col.key} />}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {currentData.length > 0 ? (
                            currentData.map((item, index) => (
                                <tr key={item.id || (startIndex + index)} className="border-b hover:bg-gray-50 transition">
                                    {columns.map((col) => (
                                        <td 
                                            key={col.key}
                                            className={`py-3 px-4 ${col.align === 'center' ? 'text-center' : ''}`}
                                        >
                                            {col.render ? col.render(item, startIndex + index) : item[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="py-8 text-center text-gray-500">
                                    {searchTerm ? `No records found matching "${searchTerm}"` : emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && filteredAndSortedData.length > 0 && (
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Per Page Selector */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Show</span>
                        <select
                            value={itemsPerPage}
                            onChange={handlePerPageChange}
                            className="border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            {perPageOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <span>entries</span>
                    </div>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-2">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1.5 rounded-lg border transition font-medium ${
                                currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-500 border-gray-300'
                            }`}
                        >
                            Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="flex gap-1">
                            {getPageNumbers().map((page, index) => (
                                page === '...' ? (
                                    <span key={`ellipsis-${index}`} className="px-3 py-1.5 text-gray-500">...</span>
                                ) : (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1.5 rounded-lg border transition font-medium min-w-[40px] ${
                                            currentPage === page
                                                ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                                                : 'bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-500 border-gray-300'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                )
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1.5 rounded-lg border transition font-medium ${
                                currentPage === totalPages
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-500 border-gray-300'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}