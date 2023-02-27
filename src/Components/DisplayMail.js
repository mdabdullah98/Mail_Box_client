import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { displayMailReadbox } from "./ReduxToolkit/Slices/MailInboxSlice";
import { BiArrowBack } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";
import { getMailsFromFirebase } from "./ReduxToolkit/Slices/MailInboxSlice";

const Wrapper = styled.section`
  width: calc(100% - 205px);
  height: 100vh;
  background: white;
  position: fixed;
  top: 14.6%;
  right: 0;
  padding: 3rem 5rem;
  z-index: 100;
  .main-modal-div {
    width: 100%;
    height: 100%;
    .back-button {
      width: 3rem;
      height: 3rem;
      margin: 1rem;
      text-align: center;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .view-mail {
      display: flex;
      align-items: center;

      h3 {
        margin: 0 0 0 0.3rem;
      }
      .bsPerson {
        font-size: 1.8rem;
        color: lightgray;
        margin-bottom: 0.35rem;
      }
    }
    .to-me {
      position: relative;
      span .dropdown:hover {
        background: lightgray;
        border-radius: 1rem;
        cursor: pointer;
      }
      .to-me-after-content {
        width: 30rem;
        background: white;
        position: absolute;
        margin: 1rem 0;
        padding: 1rem;
        opacity: 1;
        border: 1px solid lightgray;
        box-shadow: 0 0.5rem 0.5rem -0.5rem black;
        ul li {
          text-decoration: none;
          margin: 0 0.5rem;
        }
      }
    }
    .mail-sec {
      width: 50%;
      padding: 1rem;
      margin: 1rem;
    }
  }
`;

const DisplayMail = ({ children, item }) => {
  return ReactDOM.createPortal(
    <MailModalsContent item={item}>{children}</MailModalsContent>,
    document.getElementById("mailModal")
  );
};

const MailModalsContent = ({ item }) => {
  //react usestate
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();

  const gobackHnadler = () => {
    dispatch(displayMailReadbox());
    dispatch(getMailsFromFirebase());
  };

  const openDropdownOnclick = () => {
    setDropdown((prev) => !prev);
  };
  return (
    <Wrapper>
      <div className="main-modal-div">
        <div className="back-button" onClick={gobackHnadler} title="go-bock">
          <BiArrowBack />
        </div>

        {item
          ? item.map(
              ({ id, subject, mail, from, to, date, time, userName }) => {
                return (
                  <>
                    <div className="view-mail">
                      <span className="bsPerson">
                        <BsPersonCircle />
                      </span>
                      <h3>{from}</h3>
                    </div>
                    <div className="to-me">
                      to me
                      <span>
                        <IoIosArrowDropdown
                          className="dropdown"
                          onClick={openDropdownOnclick}
                        />
                      </span>
                      {dropdown && (
                        <div className="to-me-after-content">
                          <ul>
                            <li>username : {userName}</li>
                            <li>from :{from}</li>
                            <li>to :{to}</li>
                            <li>
                              date : {date} {time}
                            </li>
                            <li>
                              subject :{subject}-{date.slice(2, 6)}
                              &nbsp;{date.slice(-4)}
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="mail-sec">{mail}</div>
                  </>
                );
              }
            )
          : null}
      </div>
    </Wrapper>
  );
};

export { DisplayMail };
