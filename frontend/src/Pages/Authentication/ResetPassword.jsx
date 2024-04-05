import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom/dist";
import backgroundImage from "../../assets/background.png";
import logo from "../../assets/digitalflake.png";
import { Input } from "antd";
import { ResetPasswordUser } from "../../Redux/Auth/action";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.newPassword === "") {
      toast.warning("Email and password are required");
      return;
    }
    var passwordRegex =
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;

    if (!passwordRegex.test(formData.newPassword)) {
      toast.warning(
        "Password must be at least 6 characters long and contain at least one special character, one alphabetical character, and one numerical character"
      );
      return;
    }
    dispatch(ResetPasswordUser(formData)).then((res) => {
      console.log(res);
      if(res?.data?.msg === "Password reset successful"){
        toast.success(res?.data?.msg)
        setTimeout(() => {
            navigate("/user/login")
        },2000)
      }
      else{
        toast.error(res?.data?.msg)
      }
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ToastContainer position="top-right" reverseOrder={true} />
      <form
        onSubmit={handleSubmit}
        className="grid p-5 shadow-xl bg-white rounded-lg max-w-md w-full"
      >
        <div className="text-center">
          <img src={logo} alt="" className="m-auto w-32" />
          <p className="text-xl font-semibold">Welcome To Digitalflake Admin</p>
        </div>
        <Input
          type="email"
          name="email"
          placeholder="Your old Email"
          value={formData.email}
          onChange={handleChange}
          className="input-field mt-5 p-2"
        />
        <Input.Password
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          className="input-field mt-5 p-2"
        />
        <button
          type="submit"
          className="btn-primary border border-purple-900 bg-purple-900 mt-4 w-full py-3 rounded-md text-white hover:text-black font-semibold hover:border hover:border-purple-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Submit
        </button>
        <div
          onClick={() => {
            navigate("/user/login");
          }}
          className="flex underline items-end justify-center text-slate-500 mt-5 cursor-pointer"
        >
          <p>Back to Log In</p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
