import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { notify, login } from "../ReduxToolkit/Slices/AuthSlice";
import "./Signup_login.css";

const Login = () => {
  //redux related function and varibles over here
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.notification.isLoading);

  //listening inputs using useRef
  const emailRef = useRef();
  const passRef = useRef();

  //function re;ated to react-router-dom
  const navigate = useNavigate();

  // login credential function  over here
  const userLogin = async (e) => {
    // making an object using useRef.current.value
    const loginInputsValue = {
      email: emailRef.current.value,
      password: passRef.current.value,
      returnSecureToken: true,
    };
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBu3UHJRRvlu03d-ibt_7UoMALGRGtXoj4
      `;
      dispatch(
        notify({
          isLoading: true,
          status: "Sending",
          message: "Sending request please wait...",
        })
      );
      const setHeader = {
        method: "POST",
        body: JSON.stringify(loginInputsValue),
        headers: {
          "Content-Type": "application/json",
        },
      };
      // sending email password over here using fetch
      const res = await fetch(url, setHeader);

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error.message);
      }

      dispatch(
        notify({
          isLoading: false,
          status: "success",
          message: "Logged in successfully",
        })
      );
      localStorage.setItem("idToken", JSON.stringify(data.idToken));
      localStorage.setItem(
        "userinfo",
        JSON.stringify({
          displayName: data.displayName,
          email: data.email,
          userEmail: data.email.replace(/.com/gi, ""),
          userName: data.email.replace(/@gmail.com/gi, ""),
          expiresIn: data.expiresIn,
          idToken: data.idToken,
          localId: data.localId,
          refreshToken: data.refreshToken,
          reregistered: data.registered,
        })
      );
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      dispatch(
        login({
          expiresIn: expirationTime.toISOString(),
          idToken: data.idToken,
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
        navigate("/");
      }, 1500);
    } catch (err) {
      console.log("in cath sec ", err.message);
      dispatch(
        notify({
          isLoading: false,
          status: "error",
          message: `${err.message}`,
        })
      );
    }
  };

  //onsumbit event handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    userLogin();
  };
  return (
    <>
      <div className="main-form-div">
        <div className="form-div-sec">
          <form
            action=""
            className="expense_sign_up_login-form"
            onSubmit={onSubmitHandler}
          >
            <h5 className="display-6 mb-5">Login</h5>
            <div className="expense-form-inputs">
              <input
                type="emial"
                name="email"
                placeholder="Email"
                required
                ref={emailRef}
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="password"
                minLength={6}
                maxLength={15}
                required
                ref={passRef}
              />
              <br />
            </div>
            <Link
              to={"/forgot-password"}
              className="text-primary fs-6 text-decoration-none my-1"
            >
              Forgot Password ?
            </Link>
            {isLoading && <div className="loading"></div>}
            <button className="btn-info submit-button mt-1" type="submit">
              Login
            </button>
          </form>
          <h1>chupapi minaunu</h1>
          <div className="have-an-account mt-3 px-1">
            <span> Dont't Have an Account ?</span>{" "}
            <Button>
              <Link to={"/signup"}>Signup</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
