import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Button } from "@mui/material";

import Display from "./components/Display";

function Product(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/products/").then((response) => {
        setProducts(response.data);
    });
    }, []);

    const handleForm = () => {
        alert("Form will be displayed here");
    }

    return (
        <div style={{border: '50px', display: 'flex'}}>
            <Button onClick={handleForm}>Add your own products</Button>
            <h1>Products</h1>
            {products.map((product) => (
                <div style={{width: '50%', padding: '5px'}}>
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
    );
}

export default Product;
