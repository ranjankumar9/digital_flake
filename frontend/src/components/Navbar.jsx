import React, { useState } from "react";
import { IoIosContact, IoIosWarning } from "react-icons/io";
import logo from "../assets/digitalflake.png";
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";
import { LogOutUser } from "../Redux/Auth/action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showLogout, setShowLogout] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);

  const handleUsers = () => {
    setShowLogout(!showLogout);
  };

  const handleLogOutUser = () => {
    setLogoutDialog(true);
  };

  const handleLogOut = () => {
    dispatch(LogOutUser()).then((res) => {
      if(res.data.msg === "Logout successful"){
        toast.success(res?.data?.msg)
        setTimeout(() => {
          Cookies.remove('token')
          navigate("/user/login")
        },2000)
      }
      else{
        toast.error(res?.data?.msg)
      }
      console.log(res)
    })
  };

  return (
    <div className="w-full relative">
      {/* Make the container relative */}
      <div className="flex items-center justify-between bg-purple-900 h-[60px] px-[30px] z-10">
        {/* Ensure the navbar is above other content */}
        <div>
          <img
            src={logo}
            alt="logo"
            className="mix-blend-color-burn w-[70px]"
          />
        </div>
        <div className="text-white text-[30px] cursor-pointer">
          <IoIosContact className="text-white-100" onClick={handleUsers} />
        </div>
      </div>
      {showLogout && (
        <div className="absolute top-[60px] right-1 z-20 cursor-pointer">
          <div
            onClick={handleLogOutUser}
            className="bg-white py-2 px-10 shadow-xl"
          >
            <p>LogOut</p>
          </div>
        </div>
      )}
      {logoutDialog && (
        <div className="absolute top-[100%] left-1/2 transform translate[-50%,-50%] z-20 rounded-md cursor-pointer text-center">
          <div className="bg-white px-14 py-8 shadow-xl">
            <div className="flex items-center justify-center gap-2">
              <IoIosWarning className="text-red-500 text-2xl mb-2" />
              <h3 className="text-[18px]">LogOut</h3>
            </div>
            <p>Are you Sure You want to Logout</p>
            <div className="flex justify-center gap-2 mt-10">
              <button
                onClick={() => {
                  setLogoutDialog(false);
                  setShowLogout(false);
                }}
                className="border border-gray-400 px-8 py-1 rounded-full mr-4"
              >
                cancel
              </button>
              <button
                onClick={handleLogOut}
                className="bg-purple-900 text-white px-8 py-1 rounded-full"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
