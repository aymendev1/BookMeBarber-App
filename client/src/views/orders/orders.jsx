import { useContext } from "react";
import "./orders.css";
import { ThreeCircles } from "react-loader-spinner";
import { format } from "date-fns";
import Table from "../../components/Table/table";
import { DashboardContext } from "../../context/DashboardContext";
export default function Home() {
  const data = useContext(DashboardContext);

  const columns1 = [
    {
      Header: "Full Name",
      accessor: "ReservationName", // accessor is the "key" in the data
    },
    {
      Header: "Phone Number",
      accessor: "ReservationPhoneNumber",
    },
    {
      Header: "Email",
      accessor: "ReservationEmail",
    },
    {
      Header: "Service Chosen",
      accessor: "ReservationServiceChosen",
    },
    {
      Header: "Date",
      accessor: "ReservationAppointmentDate",
      Cell: (props) => format(new Date(props.value), "yyyy/MM/dd hh:mm"),
    },
  ];
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
    <main class="content-wrap">
      <header class="content-head">
        <h1>Orders History</h1>
      </header>
      <div className="content">
        <div className="tableBox orders">
          <Table data={data.appointments} column={columns1} />
        </div>
      </div>
    </main>
  );
}
