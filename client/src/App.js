import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import AuthRoutes from "./components/auth/AuthRoutes";
import UserRoutes from "./components/user/UserRoutes";
import AdminRoutes from "./components/admin/AdminRoutes";
import ProductRoutes from "./components/products/ProductRoutes";

function App() {
    return (
        <div className='font-serif'>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="auth/*" element={<AuthRoutes />} />
                    <Route path="user/*" element={<UserRoutes />} />
                    <Route path="admin/*" element={<AdminRoutes />} />
                    <Route path="products/*" element={<ProductRoutes />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
