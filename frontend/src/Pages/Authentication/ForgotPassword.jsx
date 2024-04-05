import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import backgroundImage from "../../assets/background.png";
// import logo from "../../assets/digitalflake.png";
import { Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ForgotPasswordUser } from "../../Redux/Auth/action";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      toast.warning("Email is Required");
    } else {
      dispatch(ForgotPasswordUser({ email: email })).then((res) => {
        if (res?.data?.msg === "Password Reset Link Send Successfully!") {
          toast.success(res?.data?.msg);
          setTimeout(() => {
            navigate("/user/reset-password")
          },2000)
        } else {
          toast.error(res?.data?.msg);
        }
      });
    }
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
          <p className="text-xl text-purple-900 font-semibold">
            Did You Forgot Your Password ?
          </p>
          <p className="text-sm mt-4 font-semibold">
            Enter Your Email Address and We Will Send You a Link To Restore
            Password
          </p>
        </div>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(obj) => setEmail(obj.target.value)}
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

export default ForgotPassword;
