import React from "react";
import styled from "styled-components";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./ReduxToolkit/Slices/AuthSlice";
import Notifaction from "./Notifaction";

//styled component
const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: black;
  color: white;
  .inner-div {
    width: 100%;

    h3 a {
      text-decoration: none;
      color: white;
      cursor: pointer;
    }
    .navlink {
      width: 50%;
      margin: 0 0.3rem;
      a {
        text-decoration: none;
        color: white;
        margin: 0 0.5rem;
        font-size: 1.1rem;
      }
    }
    a.active {
      color: red;
    }
  }
`;

function Header() {
  //react-redux function  over here
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      <Notifaction />
      <Wrapper>
        <div className="w-100 inner-div d-flex justify-content-evenly align-items-center">
          <h3 className="m-0">
            <Link to={"/"}>Mail Box Client</Link>
          </h3>
          <div className="d-flex justify-content-evenly align-items-center navlink">
            <NavLink to={"/"}>Home</NavLink>
            {isLoggedIn && <NavLink to={"/mail"}>Mail</NavLink>}
            {!isLoggedIn && <NavLink to={"/login"}>Login</NavLink>}
            {isLoggedIn && (
              <Link onClick={logoutHandler} to="/login">
                Logout
              </Link>
            )}
          </div>
        </div>
      </Wrapper>
      <Outlet />
    </>
  );
}

export default Header;
