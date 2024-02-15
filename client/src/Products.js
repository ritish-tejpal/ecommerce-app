import React, { Component, useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/navbar";


function Product(props) {
    const [products, setProducts] = useState([]);
    const getProducts = () => {
        axios.get("http://127.0.0.1:8000/products/").then((response) => {
            setProducts(response.data);
        });
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <Navbar />
            <h1>Products</h1>
            {products.map((product) => (
                <div>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <p>{product.quantity}</p>
                    <p>{product.category}</p>
                </div>
            ))}
        </div>
    );
}

export default Product;
