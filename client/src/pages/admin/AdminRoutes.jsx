import React from "react";
import { Routes, Route} from 'react-router-dom'

import Login from './Login'
import Dashboard from './Dashboard'
import ProductUpload from './ProductUpload'

const AdminRoutes = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<ProductUpload />} />
        </Routes>
    )
}

export default AdminRoutes;