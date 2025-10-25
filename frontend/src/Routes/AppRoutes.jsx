import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-patner/CreateFood'
import Profile from '../pages/food-patner/Profile'
const AppRoutes = () => {
    return (
        <Router>
          <Routes>
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
            <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
            <Route path="/" element={<Home />} />
            <Route path="/create-foodpartner" element={<CreateFood />} />
            <Route path='/foodpartner/:_id' element={<Profile />} />
          </Routes>
        </Router>
    )
}

export default AppRoutes;