import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainSection from "./views/mainSection/main";
import LoginPage from "./views/Login/login";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./views/home/home";
import Orders from "./views/orders/orders";
import Services from "./views/services/services";
import Profile from "./views/profile/Profile";
import LoginSetting from "./views/loginSetting/loginSettings";
import AdminSetting from "./views/RegisterProfile/RegisterProfile";
import AdminOrders from "./views/orders/ordersAdmin";
import AdminEmployees from "./views/employees/employees";
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainSection />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Home />} />
              <Route path="orders" element={<Orders />} />
              <Route path="services" element={<Services />} />
              <Route path="profile" element={<Profile />} />
              <Route path="loginSetting" element={<LoginSetting />} />
              <Route path="AdminSetting" element={<AdminSetting />} />
              <Route path="AdminOrders" element={<AdminOrders />} />
              <Route path="ViewEmployees" element={<AdminEmployees />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
