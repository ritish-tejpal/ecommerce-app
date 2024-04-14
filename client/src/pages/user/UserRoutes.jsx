import React from "react";
import { Routes, Route } from "react-router-dom";

import Accounts from "./Accounts";
import Cart from "./Cart";
import CheckoutSuccess from "./CheckoutSuccess";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
        </Routes>
    );
}

export default UserRoutes;