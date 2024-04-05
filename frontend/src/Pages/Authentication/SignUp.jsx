import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../../assets/background.png";
import logo from "../../assets/digitalflake.png";
import { useNavigate } from "react-router-dom";
import { SignUpUser } from "../../Redux/Auth/action";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      toast.warning("Name, Email and password are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.warning("Please enter a valid email address");
      return;
    }

    var passwordRegex =
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;

    if (!passwordRegex.test(formData.password)) {
      toast.warning(
        "Password must be at least 6 characters long and contain at least one special character, one alphabetical character, and one numerical character"
      );
      return;
    } else {
      dispatch(SignUpUser(formData)).then((res) => {
        if(res.data.msg === "Signup Successfully!"){
            toast.success(res.data.msg);
            setTimeout(() => {
                navigate("/user/login")
            },2000)
        }
        else{
            toast.error(res.data.msg)
        }
      }).catch((error) => {
        toast.error(error.message || "An error occurred");
      })
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
          <img src={logo} alt="" className="m-auto w-32" />
          <p className="text-xl font-semibold">Welcome To Digitalflake Admin</p>
        </div>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="input-field mt-8 p-2"
        />
        <Input
          type="text"
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
          className="flex items-end justify-end gap-1 mt-5 cursor-pointer"
        >
          <p>Already Have Account?</p>
          <p className="underline text-purple-900 hover:text-sky-400 text-[16px]">
            Login
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
