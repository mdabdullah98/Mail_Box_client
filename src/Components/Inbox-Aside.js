import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import MailsAsideRight from "./MailsAsideRight";
import { useSelector, useDispatch } from "react-redux";
import {
  getMailsFromFirebase,
  getMailsFromANotherClient,
  display_SenMailAction,
  Do_Not_display_SenMailAction,
} from "./ReduxToolkit/Slices/MailInboxSlice";
const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  z-index: 1;
  .ul-list {
    width: 15rem;
    max-width: 15rem;
    padding: 0.5rem 0.8rem 0.5rem 0;
    background: #fffbf5;
    display: flex;
    flex-direction: column;
  }
  ul {
    width: 100%;
    padding: 0;
    li {
      list-style: none;
      margin: 0.8rem 0;
      padding: 0.2rem 2rem;
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
      font-weight: bold;
      cursor: pointer;
      text-transform: capitalize;
      &:hover {
        background: #caf0f8;
        border-left: 3px solid #00b4d8;
      }
    }
    li.active {
      background: red;
    }
  }
`;

const InboxAside = () => {
  //usestate goes here
  const [fetchState, setFetchState] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const totalMail = useSelector((state) => state.mail.mailInboxCart);
  const totalUnreadMail = totalMail.filter((item) => item.read === false);

  //useeffect
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getMailsFromFirebase());
    }
  }, []);

  const fetchMailHandlerInbox = async () => {
    if (isLoggedIn) {
      dispatch(getMailsFromFirebase());
      dispatch(Do_Not_display_SenMailAction());
    }
  };
  const sentMailHandler = () => {
    dispatch(getMailsFromANotherClient());
    dispatch(display_SenMailAction());
  };
  return (
    <>
      <Wrapper>
        {isLoggedIn && (
          <div className="ul-list">
            <NavLink to={"/compose-mail"}>
              <Button className="w-100 ms-1 my-1">Compose</Button>
            </NavLink>
            <ul>
              <li onClick={fetchMailHandlerInbox}>
                Inbox <span className="h5 text-danger">{totalMail.length}</span>
              </li>
              <li>
                Unread{" "}
                <span className="h5 text-danger">{totalUnreadMail.length}</span>
              </li>
              <li onClick={sentMailHandler}>sent</li>
            </ul>
          </div>
        )}
        <MailsAsideRight />
      </Wrapper>
    </>
  );
};

export default InboxAside;
