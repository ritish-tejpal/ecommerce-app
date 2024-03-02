import React, { useState } from "react";
import { Button } from "@mui/material";

import ProductDisplay from "./components/products/ProductDisplay";
import ProductForm from "./components/products/ProductForm";

function Products(props) {
    const [form, setForm] = useState(false);

    const handleForm = () => {
        setForm(!form);
    }

    return (
        <div className="main">
            <h1>Products</h1>
            <Button onClick={handleForm}>Add Product</Button>
            {form && <ProductForm />}
            {!form && <ProductDisplay />}
        </div>
    );
}

export default Products;
