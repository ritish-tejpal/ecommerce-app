import React from "react";
import { Routes, Route } from "react-router-dom";

import Products from "./Products";
import Product from "./Product";

const ProductRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/:name" element={<Product />} />
        </Routes>
    )
}

export default ProductRoutes;