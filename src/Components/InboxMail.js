import React from "react";
import { BsPersonCircle } from "react-icons/bs";
// import { BiHomeSmile } from "react-icons/bi";
import { useSelector } from "react-redux";
import InboxAside from "./Inbox-Aside";

const InboxMail = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = isLoggedIn
    ? JSON.parse(localStorage.getItem("userinfo")).userName
    : "";
  return (
    <>
      {isLoggedIn && (
        <div className="w-100 py-2 px-5 bg-info text-light">
          <div className="d-flex justify-content-between align-items-center">
            <div className="w-75 d-flex justify-content-around align-items-center">
              <h5 className="fw-bold m-0">Yahoo/mail</h5>
              {/* search section will se it is inside project or not */}
            </div>
            <div className=" fs-5 ms-2 d-flex justify-content-between">
              <span className="me-3">
                <BsPersonCircle /> {userName}
              </span>
            </div>
          </div>
        </div>
      )}

      {<InboxAside />}
    </>
  );
};

export default InboxMail;
