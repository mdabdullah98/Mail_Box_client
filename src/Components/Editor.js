import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//redux all action here from mailFormSLice
import {
  mailToFunc,
  subjectFunc,
  composeMailFunc,
  // boldFunc,
  // italicFunc,
} from "./ReduxToolkit/Slices/MailFormSlice";

// redux action from AuthSlice
import { notify } from "./ReduxToolkit/Slices/AuthSlice";

//styled object getting from StyledComponent
const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  form {
    width: 70%;
    margin: 0 auto;
    padding: 2rem 0;
    .input-div {
      border: 1px solid lightgray;
      margin-left: 1rem;
      border-radius: 1rem;
      display: flex;
    }
    input {
      margin: 0 0.7rem;
      border: none;
      outline: none;
      font-family: italic;
    }
    .bs-people-icons {
      font-size: 1.8rem;
      color: lightgray;
    }
    textarea {
      width: 100%;
      height: 16rem;
      border: none;
      outline: none;
      resize: none;
    }
    textarea.bold {
      font-weight: bold;
    }
    .editor-sec {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1.5rem;
      .editor-items {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .bold-span,
        .italic-span {
          font-size: 1.3rem;
          padding: 0.2rem 0.8rem;
          border: 0.5px solid lightgray;
          border-radius: 0.2rem;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .editor-items.bold span:nth-of-type(1),
    .editor-items.fst-italiconly span:nth-of-type(2) {
      background: black;
      color: white;
    }
  }
`;

const Editor = () => {
  // react router dom sec
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // redux state here
  const { mailToInputs, subjectValue, composeMailValue, boldFont, italicFont } =
    useSelector((state) => state.editorForm);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  //all function realted to this component here
  const mailToHandler = (e) => {
    dispatch(mailToFunc(e.target.value));
  };
  const subjectHandler = (e) => {
    dispatch(subjectFunc(e.target.value));
  };

  const textAreaHandler = (e) => {
    dispatch(composeMailFunc(e.target.value));
  };

  // current time
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  // making userData with using redux toolkit state and localstorage
  const getuserinfo = JSON.parse(localStorage.getItem("userinfo"));
  let userInfo = getuserinfo !== null ? getuserinfo : "";
  const userData = {
    from: userInfo.email,
    to: mailToInputs,
    subject: subjectValue,
    mail: composeMailValue,
    time: formatAMPM(new Date()),
    date:
      new Date().getDate() +
      " " +
      new Date().toLocaleString("default", { month: "long" }) +
      " " +
      new Date().getFullYear(),
    read: false,
    userName: userInfo.userName,
  };

  //seding to in other project so I can use for sent mails
  const sendOtherDataWithoutEmail = async () => {
    try {
      const url = `https://formail-boxanother-client-default-rtdb.firebaseio.com/mails.json`;
      const setHeader = {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(url, setHeader);
    } catch (err) {
      console.error(err);
    }
  };

  //posting mail to specided user email
  const sendMailToUser = async () => {
    try {
      dispatch(
        notify({
          isLoading: false,
          status: "Sending",
          message: "Sending request please wait...",
        })
      );
      const url = `https://mail-box-client-efeff-default-rtdb.firebaseio.com/${mailToInputs.replace(
        /.com/gi,
        ""
      )}.json`;
      const setHeader = {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(url, setHeader);

      if (!res.ok) {
        const data = await res.json();
        console.log("i am in throw new error ", data.error);
        throw new Error(data.error);
      }

      dispatch(
        notify({
          isLoading: false,
          status: "success",
          message: "Request Sent successful",
        })
      );

      setTimeout(() => {
        dispatch(
          notify({
            isLoading: false,
            status: null,
            message: null,
          })
        );
      }, 1500);
      navigate("/mail");
    } catch (err) {
      console.log("i am in cath", err);
      dispatch(
        notify({
          isLoading: false,
          status: "error",
          message: `${err.message}`,
        })
      );
    }
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    sendMailToUser();
    sendOtherDataWithoutEmail();
  };

  return (
    <>
      {isLoggedIn && (
        <Wrapper>
          <form action="" onSubmit={onsubmitHandler}>
            <div className="d-flex pb-3 border-2 border-bottom">
              <label htmlFor="to" className="text-muted">
                To
              </label>
              <div className="input-div">
                <BsPersonCircle className="bs-people-icons" />
                <input
                  type="email"
                  placeholder="john@xyz.com"
                  name="email"
                  onChange={mailToHandler}
                  value={mailToInputs}
                  required
                />
              </div>
            </div>
            <div className=" mt-2 pb-2 border-2 border-bottom">
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                onChange={subjectHandler}
                value={subjectValue}
                required
              />
            </div>
            <div className={`mt-2 pb-2 border-2 border-bottom`}>
              <textarea
                name="mail-text-area"
                id="mail-text-area"
                placeholder="Compose email"
                onChange={textAreaHandler}
                value={composeMailValue}
                className={`${boldFont} ${italicFont}`}
                required
              ></textarea>
            </div>
            <div className="editor-sec">
              <div
                className={`editor-items ${boldFont} ${italicFont + "only"}`}
              >
                <Button type="submit">Send</Button>
                {/* <span
                  onClick={() => dispatch(boldFunc("bold"))}
                  title="bold"
                  className="bold-span"
                >
                  B
                </span>
                <span
                  onClick={() => dispatch(italicFunc("fst-italic"))}
                  title="italic"
                  className="italic-span"
                >
                  <em>I</em> */}
                {/* </span> */}

                <Button className="ms-3" onClick={() => navigate("/mail")}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Wrapper>
      )}
    </>
  );
};

export default Editor;
