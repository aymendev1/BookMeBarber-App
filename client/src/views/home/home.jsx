import "./home.css";
import React, { useContext } from "react";
import { format } from "date-fns";
import { MdAttachMoney } from "react-icons/md";
import { BsClipboardPlus } from "react-icons/bs";
import { TbCut } from "react-icons/tb";
import { ThreeCircles } from "react-loader-spinner";
import MiniStatsCard from "../../components/cards/MiniStatistics";
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
        <h1>Main Dashboard</h1>
      </header>
      <div className="content">
        <div className="statsBox">
          <MiniStatsCard
            title="Total Orders"
            value={
              data.appointments === undefined
                ? "Loading..."
                : data.appointments.length
            }
            icon={<BsClipboardPlus />}
          />
          <MiniStatsCard
            title="Earnings This Months"
            value="99zl"
            icon={<MdAttachMoney />}
          />
          <MiniStatsCard
            title="Services"
            value={
              data.serviceList === undefined
                ? "Loading..."
                : data.serviceList.length
            }
            icon={<TbCut />}
          />
        </div>
        <hr />
        <div className="mainHome">
          <div className="tableBox">
            <span>Order History</span>
            <Table
              data={data.appointments === undefined ? [] : data.appointments}
              column={columns1}
            />
          </div>
          <div className="tableBox">
            <span>Services Available</span>
            <Table
              data={data.serviceList === undefined ? [] : data.serviceList}
              column={columns2}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
