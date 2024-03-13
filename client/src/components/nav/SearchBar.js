import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState([])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if(search === "") return setProducts([])
        
        axios.get('http://127.0.0.1:8000/products/search/', {
            params: {
                name: search
            }
        })
        .then((response) => {
            setProducts(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    },[search])

    return (
        <>
        <form>
            <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    id="search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-green-50 focus:ring-green-500 focus:border-green-500 focus:outline"
                    placeholder="Search"
                    required
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Search
                </button>
            </div>
        </form>
        {products.map((product) => {
            return (
                <a href={"/products/?=" + {product}}>
                <h1>{product}</h1>
                </a>
            )
        })}
        </>
    );
};

export default SearchBar;
