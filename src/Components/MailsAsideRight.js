import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineStar } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  displayMailReadbox,
  patchForUpdateReadValue,
  deleteRequestOnclick,
  getMailsFromFirebase,
} from "./ReduxToolkit/Slices/MailInboxSlice";
import { DisplayMail } from "./DisplayMail";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
  .mail-tabs-sec {
    width: 100%;
    height: 4.5rem;
    overflow: hidden;
    display: flex;
    padding: 0.3rem 0;
    align-items: center;
    background: #fffbf5;
    cursor: pointer;
    border: 0.5px solid lightgray;
    .checkbox-read-source {
      width: 20rem;
      height: 100%;
      display: flex;
      align-items: center;
      z-index: 1;
      .read-unread {
        width: 0.8rem;
        height: 0.86rem;
        border-radius: 1rem;
        border: 0.5px solid black;
      }
      .read-unread.false {
        background: cyan;
      }
    }
    input,
    div {
      text-transform: capitalize;
      cursor: pointer;
      margin: 0 0.5rem;
    }
    .star-mails {
      width: 85%;
      display: flex;
      align-items: center;
    }
  }
  .mail-tabs-sec.true {
    background: white;
  }
`;

const MailsAsideRight = () => {
  //react-router-dom
  const dispatch = useDispatch();
  const mailsInbox = useSelector((state) => state.mail.mailInboxCart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const displaymailInbox = useSelector((state) => state.mail.dismailInbox);
  const displaySentMail = useSelector((state) => state.mail.displaySentMail);
  const sentMail = useSelector((state) => state.mail.sentMailInbox);
  // usestate
  const [clickedMail, setclickedMail] = useState([]);

  const openMailOnclick = useCallback((item, id) => {
    dispatch(displayMailReadbox());
    if (!displaySentMail) {
      dispatch(patchForUpdateReadValue(id));
    }
    setclickedMail([item]);
  });

  // cheching which mail show we display the inbox section or sent section if sent section click so the sent mail wii be display insted
  let mapthisVar = mailsInbox;
  if (displaySentMail) {
    mapthisVar = sentMail;
  }
  const deleteMailHandler = useCallback((id) => {
    if (!displaySentMail) {
      dispatch(deleteRequestOnclick(id));
    }
  });

  return (
    <>
      {false || (displaymailInbox && <DisplayMail item={clickedMail} />)}
      <Wrapper>
        {isLoggedIn && mapthisVar.length !== 0 ? (
          mapthisVar.map((item) => {
            const { from, mail, to, subject, date, time, id, read, userName } =
              item;
            return (
              <>
                <div
                  className={`mail-tabs-sec ${displaySentMail ? "" : read}`}
                  key={id}
                >
                  <div className=" checkbox-read-source">
                    <div
                      className={` ${displaySentMail ? "" : read} ${
                        displaySentMail ? "" : "read-unread"
                      }`}
                      value="read-unread"
                    ></div>
                    <div className="d-flex me-3 ">
                      {displaySentMail ? "to" : "From"}
                      <span className="ms-3 text-danger fw-bold">
                        {displaySentMail ? to : userName}
                      </span>
                    </div>
                  </div>

                  <div className="star-mails">
                    <div>
                      <AiOutlineStar />
                    </div>
                    <div
                      className="mail-content"
                      onClick={() => openMailOnclick(item, id)}
                    >
                      <div>{mail}...</div>
                    </div>
                  </div>
                  <div
                    onClick={() => deleteMailHandler(id)}
                    className={`${
                      displaySentMail ? "d-none" : "fs-5 text-dark"
                    }`}
                  >
                    <MdDelete />
                  </div>
                  <div className="time-sec">{time}</div>
                </div>
              </>
            );
          })
        ) : (
          <div>No mails found</div>
        )}
      </Wrapper>
    </>
  );
};

export default MailsAsideRight;
