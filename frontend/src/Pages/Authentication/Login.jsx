import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom/dist";
import backgroundImage from "../../assets/background.png";
import logo from "../../assets/digitalflake.png";
import { Input } from "antd";
import { LoginUser } from "../../Redux/Auth/action";
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (formData.email === "" || formData.password === "") {
      toast.warning("Email and password are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.warning("Please enter a valid email address");
      return;
    }
    dispatch(LoginUser(formData)).then((res) => {
      console.log(res.data);
      if (res.data.msg === "Login Successful") {
        toast.success(res.data.msg);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        Cookies.set("bearertoken", res?.data?.token)
      } else {
        toast.error(res.data.msg);
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
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input-field mt-5 p-2"
        />
        <Input.Password
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input-field mt-5 p-2"
        />
        <div className="flex items-end justify-end mt-4">
          <p
            onClick={() => {
              navigate("/user/forgot-password");
            }}
            className="cursor-pointer text-purple-900 hover:text-sky-400 hover:underline"
          >
            Forgot Password?
          </p>
        </div>
        <button
          type="submit"
          className="btn-primary border border-purple-900 bg-purple-900 mt-4 w-full py-3 rounded-md text-white hover:text-black font-semibold hover:border hover:border-purple-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Submit
        </button>
        <div
          onClick={() => {
            navigate("/user/signup");
          }}
          className="flex items-center justify-end gap-1 mt-5 cursor-pointer"
        >
          <p>You Don't Have Account?</p>
          <p className="underline text-purple-900 hover:text-sky-400 text-[17px]">
            Signup
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
