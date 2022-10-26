import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainSection from "./components/mainSection/main";
import LoginPage from "./components/Login/login";
import DashboardEmployee from "./components/DashboardEmployee/dashboardEmployee";
function App() {
  // const homePage = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <MainSection />,
  //   },
  // ]);
  // const Login = createBrowserRouter([
  //   {
  //     path: "/login",
  //     element: <LoginPage />,
  //   },
  // ]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
