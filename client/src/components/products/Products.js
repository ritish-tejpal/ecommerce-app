import React, { useState, useEffect } from "react";
import CardDisplay from "./display/CardDisplay";
import axios from "axios";

const Products = () => {
    const [display, setDisplay] = useState("Grid");
    const [products, setProducts] = useState([]);

    const toggleDisplay = () => {
        if(display === "List") {
            setDisplay("Grid");
        } else {
            setDisplay("List");
        }
    }

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/products/")
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [])

    return(
        <div classname="container static mx-auto items-center py-4">
            <div className="">
                <div className="flex justify-center py-4 relative">
                    <h1 className="font-bold text-5xl">Products</h1>
                    <button 
                        className="absolute right-1/4 top-1/3 w-28 p-2 bg-green-400 text-green-200 rounded-lg hover:bg-green-500 hover:text-green-100" 
                        onClick={toggleDisplay}
                    >
                        {display}
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-4 p-10">
                    {products.map((product) => {
                        return (
                            <CardDisplay product={product} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Products;
