import React from "react";
import { Routes, Route } from "react-router-dom";

import Accounts from "./Accounts";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Payment from "./Payment";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
        </Routes>
    );
}

export default UserRoutes;