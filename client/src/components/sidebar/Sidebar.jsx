import { useContext } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { IoCut } from "react-icons/io5";
import { FiSettings, FiUserPlus, FiUser, FiUsers } from "react-icons/fi";
import { DashboardContext } from "../../context/DashboardContext";
const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <AiOutlineHome />,
    to: "/dashboard",
    section: "",
  },
  {
    display: "Orders",
    icon: <BsCartCheck />,
    to: "/dashboard/orders",
    section: "Orders",
  },
  {
    display: "Services",
    icon: <IoCut />,
    to: "/dashboard/services",
    section: "Services",
  },
  {
    display: "Profile",
    icon: <FiUser />,
    to: "/dashboard/profile",
    section: "profile",
  },
  {
    display: "Login Settings",
    icon: <FiSettings />,
    to: "/dashboard/loginSetting",
    section: "loginSettings",
  },
];
const sidebarNavItemsAdmin = [
  {
    display: "Register Employee",
    icon: <FiUserPlus />,
    to: "/dashboard/AdminSetting",
    section: "Register Employee",
  },
  {
    display: "All Orders",
    icon: <BsCartCheck />,
    to: "/dashboard/AdminOrders",
    section: "Orders",
  },
  {
    display: "View Employees ",
    icon: <FiUsers />,
    to: "/dashboard/ViewEmployees",
    section: "Orders",
  },
];
const Sidebar = () => {
  const data = useContext(DashboardContext);

  return (
    <header class="menu-wrap">
      <figure class="user">
        <div class="user-avatar">
          <img src={data.avatar} alt="" />
        </div>
        <figcaption>{data.name}</figcaption>
      </figure>
      <nav>
        <section class="dicover">
          <h3>Discover</h3>

          <ul>
            {sidebarNavItems.map((item, index) => (
              <li>
                <Link to={item.to} key={index}>
                  {item.icon}
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section class="dicover">
          <h3>Admin Settings</h3>

          <ul>
            {sidebarNavItemsAdmin.map((item, index) => (
              <li>
                <Link to={item.to} key={index}>
                  {item.icon}
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </nav>
    </header>
  );
};

export default Sidebar;
