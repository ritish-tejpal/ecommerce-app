import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import Display from "./Display";

const ProductDisplay = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/products/").then((response) => {
        setProducts(response.data);
    });
    }, []);


    return (
        <div className="main">
            {products.map((product) => (
                <div key={product.id} style={{display: "flex", flexDirection: "row", width: "1000px", justifyContent: "center", padding: '5px'}}>
                    <Display
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        quantity={product.quantity}
                        category={product.category}
                    />
                </div>
            ))}
        </div>
    )
}

export default ProductDisplay
