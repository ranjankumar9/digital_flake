import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdArrowRight } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-neutral-200 w-[25%]">
      <div className="flex flex-col items-center justify-center m-auto text-center gap-5 pt-[30px] ">
        <NavLink
          to="/"
          className={`flex items-center justify-between w-full cursor-pointer px-[15px] py-[8px] ${
            location.pathname === "/" ? "bg-yellow-100" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <IoHomeOutline />
            <p className=" ">Home</p>
          </div>
          <div
            className={`text-[28px]  ${
              location.pathname === "/" ? "text-black" : "text-gray-500"
            }`}
          >
            <MdArrowRight />
          </div>
        </NavLink>
        <NavLink
          to="/category"
          className={`flex items-center justify-between w-full cursor-pointer px-[15px] py-[8px] ${
            location.pathname === "/category" ? "bg-yellow-100" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <RxDashboard />
            <p className=" ">Category</p>
          </div>
          <div
            className={`text-[28px]  ${
              location.pathname === "/category" ? "text-black" : "text-gray-500"
            }`}
          >
            <MdArrowRight />
          </div>
        </NavLink>
        <NavLink
          to="/products"
          className={`flex items-center justify-between w-full cursor-pointer px-[15px] py-[8px] ${
            location.pathname === "/products" ? "bg-yellow-100" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <BsBoxSeam />
            <p className=" ">Products</p>
          </div>
          <div
            className={`text-[28px]  ${
              location.pathname === "/products" ? "text-black" : "text-gray-500"
            }`}
          >
            <MdArrowRight />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
