import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import Swal from "sweetalert2";
import Table from "../../components/Table/table";
import { DashboardContext } from "../../context/DashboardContext";
export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [Error, setError] = useState();
  const UserDetails = useContext(DashboardContext);
  if (UserDetails.isAdmin !== true) {
    setError({
      message: "Access Denied !",
      info: "You don't have the access to the following resources",
    });
  }
  const fetchData = useCallback(() => {
    setError();
    setLoading(true);
    axios({
      method: "get",
      url: "/employee/",
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      },
      params: { isAdmin: UserDetails.isAdmin },
    })
      .then((response) => {
        if (response.status === 200) {
          const newdata = response.data;
          setData(newdata);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data);
      });
  }, [UserDetails.isAdmin]);
  useEffect(() => {
    // fetch only when user details are not present
    if (!data || data.length === 0) {
      fetchData();
    }
  }, [data, fetchData]);
  if (Error) {
    Swal.fire({
      icon: "error",
      title: Error.message,
      text: Error.info,
    });
    setTimeout(() => {
      window.location.replace("/dashboard");
    }, 2000);
  }
  const columns1 = [
    {
      Header: "ID",
      accessor: "employeeID",
    },
    {
      Header: "Full Name",
      accessor: "name", // accessor is the "key" in the data
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Admin Access",
      accessor: "isAdmin",
      Cell: (props) => {
        if (props.value === true) {
          return "Yes";
        } else {
          return "No";
        }
      },
    },
  ];
  return isLoading ? (
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
  ) : Error ? (
    <main class="content-wrap"></main>
  ) : (
    <main class="content-wrap">
      <header class="content-head">
        <h1>Orders History</h1>
      </header>
      <div className="content">
        <div className="tableBox orders">
          <Table data={data} column={columns1} />
        </div>
      </div>
    </main>
  );
}
