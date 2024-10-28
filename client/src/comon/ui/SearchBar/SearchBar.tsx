import React, { FC, useState, ChangeEvent } from 'react';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (searchQuery: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ placeholder = 'Search...', onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query); // Call onSearch prop to handle search query
    };

    return (
        <div className="flex items-center w-full max-w-md p-2 bg-white border rounded-lg">
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 text-gray-700 border-none outline-none"
            />
        </div>
    );
};

export default SearchBar;
