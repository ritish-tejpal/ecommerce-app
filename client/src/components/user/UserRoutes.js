import React from "react";
import { Routes, Route } from "react-router-dom";

import Accounts from "./Accounts";
import Cart from "./Cart";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    );
}

export default UserRoutes;