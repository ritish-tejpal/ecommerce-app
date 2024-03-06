import React from "react";
import search from '../assets/search.png'

const SearchBar = () => {
    return (
        <form action="/" method="post">
            <div className="flex items-center">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search"
                    className="border-2 border-green-400 p-2 focus:outline-none focus:shadow-outline"
                />
                <button type="submit" className="bg-green-400 p-2">
                    <img className="h-8" src={search} alt="search-icon" />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
