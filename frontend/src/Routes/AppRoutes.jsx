import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import FoodPartnerRegister from '../pages/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'

const AppRoutes = () => {
    return (
        <Router>
          <Routes>
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
            <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
            <Route path="/" element={<UserLogin />} />
          </Routes>
        </Router>
    )
}

export default AppRoutes