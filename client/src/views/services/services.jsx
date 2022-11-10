import "./services.css";
import React from "react";
import { DashboardContext } from "../../context/DashboardContext";
import Table from "../../components/Table/table";
import axios from "axios";
import Swal from "sweetalert2";
import { ThreeCircles } from "react-loader-spinner";
export default function Home() {
  const data = React.useContext(DashboardContext);
  const [ServiceName, setServiceName] = React.useState([]);
  const [ServicePrice, setServicePrice] = React.useState([]);
  const [Error, setError] = React.useState(null);
  const columns2 = [
    {
      Header: "Service Name",
      accessor: "name", // accessor is the "key" in the data
    },
    {
      Header: "Price",
      accessor: "price",
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      axios({
        method: "PUT",
        url: "/employee/service",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ ServiceName, ServicePrice }),
        withCredentials: true,
      })
        .then(async (response) => {
          if (response.status !== 200) {
            if (response.status === 400) {
              setError("Please fill all the fields correctly!");
            } else if (response.status === 401) {
              setError("Invalid email and password combination.");
            } else {
              setError("Please Try Again");
            }
          } else {
            const data = await response.data;
            if (data) {
              Swal.fire({
                icon: "success",
                title: "Service Added !",
                text: " ",
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          }
        })
        .catch((er) => {
          setError("Something went wrong.\n" + er.message);
        });
    } catch (error) {
      setError("Something went wrong.\n" + error.message);
      console.log(error);
    }
  };
  if (Error) {
    Swal.fire({
      icon: "errorIconHtml",
      title: "Oups !",
      text: Error,
    });
  }
  return data.length === 0 ? (
    <main class="content-wrap LoadingSection">
      <ThreeCircles
        height="80"
        width="80"
        color="#4b84fe"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </main>
  ) : (
    <main class="content-wrap services">
      <header class="content-head">
        <h1>Manage Services</h1>
      </header>
      <div className="content">
        <div className="inputorder_container">
          <h2>Add Service</h2>
          <div className=" tableBox  ">
            <form onSubmit={handleSubmit} className="inputServices">
              <div>
                <span>Service Name :</span>
                <input
                  type="text"
                  name="ServiceName"
                  id="ServiceName"
                  value={ServiceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="ex : Fade Cut ..."
                />
              </div>
              <div>
                <span>Price :</span>
                <input
                  type="number"
                  name="ServicePrice"
                  id="ServicePrice"
                  value={ServicePrice}
                  onChange={(e) => setServicePrice(e.target.value)}
                  placeholder="ex : 99.."
                />
              </div>
              <button type="submit" className="btn btnService">
                Add Service
              </button>
            </form>
          </div>
        </div>
        <div className="serviceDisplayContainer">
          <h2>Available Services</h2>
          <div className="tableBox ">
            <Table data={data.serviceList} column={columns2} />
          </div>
        </div>
      </div>
    </main>
  );
}
