import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainSection from "./components/mainSection/main";
import LoginPage from "./components/Login/login";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./components/DashboardEmployee/dashboardEmployee";
import Home from "./views/home/home";
import Orders from "./views/orders/orders";
import Services from "./views/services/services";
import Profile from "./views/profile/Profile";
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
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
