import React from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import Verify from "./Verify";
import Logout from "./Logout";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path='/signup' element={ <Signup /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/verify' element={<Verify /> } />
            <Route path='/logout' element={ <Logout /> } />
        </Routes>
    );
}

export default AuthRoutes;