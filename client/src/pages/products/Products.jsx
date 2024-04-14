import React, { useState, useEffect } from "react";
import CardDisplay from "./display/CardDisplay";
import axios from "axios";
import { ListDisplay } from "./display/ListDisplay";

const Products = () => {
    const [display, setDisplay] = useState("Grid");
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);

    const toggleDisplay = () => {
        if(display === "List") {
            setDisplay("Grid");
        } else {
            setDisplay("List");
        }
    }

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/products/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((response) => {
            setProducts(response.data.products);
            setImages(response.data.images);
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
                        className="absolute right-1/4 top-1/3 w-28 p-2 bg-green-400 text-green-200 rounded-lg hover:bg-green-500 hover:text-green-100 focus:outline-none" 
                        onClick={toggleDisplay}
                    >
                        {display}
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-4 p-10">
                    {products.map((product) => {
                        return (
                            <div className="col-span-1" key={product.id}>
                                {display === "Grid" ? (
                                    <CardDisplay product={product} image={images[product.id]} />
                                ) : (
                                    <ListDisplay product={product} image={images[product.id]} />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Products;
