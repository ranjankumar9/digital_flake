import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import logo from '../assets/digitalflake.png' 
import { useSelector } from "react-redux";

const Home = () => {

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col items-center justify-center p-4">
            <img src={logo} alt="logo" className="mix-blend-color-burn w-[150px]" /> 
            <p className="text-center">Welcome To Digitalflake Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
