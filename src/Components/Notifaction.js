import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
const Notifaction = () => {
  //getting redux state  here
  const { status, message } = useSelector((state) => state.auth.notification);
  //notification condition
  let notificationBackGroundColor = "black";
  if (status === "sending") {
    notificationBackGroundColor = "#f8e16c";
  }
  if (status === "success") {
    notificationBackGroundColor = "#38b000";
  }
  if (status === "error") {
    notificationBackGroundColor = "#ef233c";
  }

  const Wrapper = styled.section`
    width: 100%;
    animation: notify-anime 0.5s forwards linear;
    div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 3rem;

      p {
        margin: 0;
        font-size: 1.2rem;
      }
    }
    div.${status} {
      background: ${notificationBackGroundColor};
      color: white;
    }
    @keyframes notify-anime {
      0% {
        transform: translateY(-3rem);
        opacity: 0;
      }
      50% {
        transform: translateY(-1.5rem);
        opacity: 0.5;
      }
      100% {
        transform: translateY(0rem);
        opacity: 1;
      }
    }
  `;
  return (
    <Wrapper>
      {!!status && (
        <div className={`${status}`}>
          <p>{status} :</p>
          <p>{message}</p>
        </div>
      )}
    </Wrapper>
  );
};

export default Notifaction;
