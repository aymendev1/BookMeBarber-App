import "./profile.css";
import { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import FileBase64 from "react-file-base64";
import { ThreeCircles } from "react-loader-spinner";
import { DashboardContext } from "../../context/DashboardContext";
import { BsCartPlus } from "react-icons/bs";
import { RiScissors2Line } from "react-icons/ri";

export default function ProfileView() {
  const data = useContext(DashboardContext);

  // eslint-disable-next-line no-unused-vars
  const [EmployeeName, setEmployeeName] = useState(
    !data.name ? "Loading" : data.name
  );
  const [EmployeeEmail, setEmployeeEmail] = useState(
    !data.email ? "Loading" : data.email
  );
  const [EmployeeAddress, setEmployeeAddress] = useState(
    !data.address ? "Loading" : data.address
  );
  const [EmployeeAvatar, setEmployeeAvatar] = useState(
    !data.avatar ? "Loading" : data.avatar
  );
  const [ErrorMsg, setErrorMsg] = useState();
  // Converting the Uploaded Image to Base64 to store it in Database
  const getFiles = (files) => {
    setErrorMsg();
    console.log(files);
    const TypeOfAcceptedFiles = ["image/jpeg", "image/webp", "image/png"];
    if (TypeOfAcceptedFiles.includes(files.type))
      setEmployeeAvatar(files.base64);
    else {
      setErrorMsg({
        message: "Upload Failed !",
        info: "Please Upload a valid Image file",
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg();
    try {
      axios({
        method: "PUT",
        url: "/employee/profile",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          EmployeeName,
          EmployeeEmail,
          EmployeeAddress,
          EmployeeAvatar,
        }),
        withCredentials: true,
      })
        .then(async (response) => {
          const data = await response.data;
          if (data) {
            Swal.fire({
              icon: "success",
              title: data.message,
              text: data.info,
            });
          }
          setTimeout(() => window.location.reload(), 2000);
        })
        .catch((er) => {
          setErrorMsg({
            message: er.response.data.message,
            info: er.response.data.info,
          });
        });
    } catch (error) {
      setErrorMsg({
        message: "Something went wrong :(",
        info: error,
      });
    }
  };
  if (ErrorMsg) {
    Swal.fire({
      icon: "error",
      title: ErrorMsg.message,
      text: ErrorMsg.info,
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
    <main class="content-wrap">
      <header class="content-head">
        <h1>Edit Profile</h1>
      </header>
      <div className="content">
        <div className="container">
          <div class="person-box">
            <div class="box-avatar">
              <img src={data.avatar} alt="" />
            </div>

            <div class="box-bio">
              <h2 class="bio-name">{data.name}</h2>
              <p class="bio-position">{data.employeeID}</p>
            </div>

            <div class="box-actions">
              <button>
                <BsCartPlus />
              </button>

              <button>
                <RiScissors2Line />
              </button>
            </div>
          </div>
          <div className="inputorder_container ">
            <div className=" tableBox  ">
              <form onSubmit={handleSubmit} className="profileInput">
                <div>
                  <span>Employee ID :</span>
                  <input
                    type="text"
                    name="EmployeeID"
                    id=""
                    value={data.employeeID}
                    disabled
                  />
                </div>
                <div>
                  <span>Full Name :</span>
                  <input
                    type="text"
                    name="EmployeeName"
                    id=""
                    placeholder=" your Name Here ..."
                    value={EmployeeName}
                    disabled
                  />
                </div>
                <div>
                  <span> Email :</span>
                  <input
                    type="email"
                    name="EmployeeEmail"
                    id=""
                    value={EmployeeEmail}
                    onChange={(e) => setEmployeeEmail(e.target.value)}
                  />
                </div>
                <div>
                  <span>Address :</span>
                  <input
                    type="text"
                    name="EmployeeAddress"
                    id=""
                    placeholder="Stress,Flat No ..."
                    value={EmployeeAddress}
                    onChange={(e) => setEmployeeAddress(e.target.value)}
                  />
                </div>
                <div>
                  <span>Avatar :</span>
                  <FileBase64
                    accept="image/*"
                    multiple={false}
                    onDone={getFiles.bind(this)}
                  />
                </div>
                <button type="submit" className="btn btnProfile">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
