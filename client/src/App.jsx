import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import AuthRoutes from "./pages/auth/AuthRoutes";
import UserRoutes from "./pages/user/UserRoutes";
import AdminRoutes from "./pages/admin/AdminRoutes";
import ProductRoutes from "./pages/products/ProductRoutes";

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