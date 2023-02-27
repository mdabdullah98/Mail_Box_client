import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Header from "./Components/Header";
import Signup from "./Components/Pages/SignUp";
import Login from "./Components/Pages/Login";
import Home from "./Components/Home";
import ForgotPassword from "./Components/Pages/ForgotPassword";
import Editor from "./Components/Editor";
import InboxMail from "./Components/InboxMail";
import "./App.css";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header />}>
        <Route index element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/mail" element={<InboxMail />}></Route>
        <Route path="/compose-mail" element={<Editor />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
