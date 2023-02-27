import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../ReduxToolkit/Slices/AuthSlice";
import "./Signup_login.css";

const Signup = () => {
  // function related to react-router-dom
  const navigate = useNavigate();

  // function related to react-redux over here
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.notification.isLoading);

  // usestate and other variables section here //
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // component varaibel and functions here //
  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };
  const formInputValue = {
    email: input.email,
    password: input.password,
    returnSecureToken: true,
  };

  //sending to firebase
  const userSignup = async (e) => {
    try {
      dispatch(
        notify({
          isLoading: true,
          status: "Sending",
          message: "Sending request please wait...",
        })
      );
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBu3UHJRRvlu03d-ibt_7UoMALGRGtXoj4
    `;
      const setHeader = {
        method: "POST",
        body: JSON.stringify(formInputValue),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(url, setHeader);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error.message);
      }
      dispatch(
        notify({
          isLoading: false,
          status: "success",
          message: "Request sent successfully",
        })
      );
      setTimeout(() => {
        e.target.reset();
        dispatch(
          notify({
            isLoading: false,
            status: null,
            message: null,
          })
        );
        navigate("/login");
      }, 1500);
    } catch (err) {
      dispatch(
        notify({
          isLoading: false,
          status: "error",
          message: `${err.message}`,
        })
      );
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    userSignup(e);
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
            <h5 className="display-6 mb-5">Sign Up</h5>
            <div className="expense-form-inputs">
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                onChange={onchangeHandler}
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="password"
                minLength={6}
                maxLength={15}
                required
                onChange={onchangeHandler}
              />
              <br />
              <input
                className="mb-2"
                type="password"
                name="confirmPassword"
                placeholder="confrim password"
                minLength={6}
                maxLength={15}
                required
                onChange={onchangeHandler}
              />
              <br />
            </div>
            {isLoading && <div className="loading"></div>}
            {/* <div className="loader"></div> */}
            <button className="btn-info submit-button" type="submit">
              Sign up
            </button>
          </form>
          <Button gardient="primary" className="have-an-account mt-3">
            <Link to={"/login"}>login with existin account</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Signup;
