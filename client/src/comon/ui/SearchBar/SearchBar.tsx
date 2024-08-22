import React, { FC, useState, ChangeEvent } from 'react';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (searchQuery: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ placeholder = 'Search...', onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <div className="flex items-center w-full max-w-md p-2 bg-white border rounded-lg shadow-md">
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 text-gray-700 border-none outline-none"
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
