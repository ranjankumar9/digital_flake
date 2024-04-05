import React, { useState } from "react";

import { Input, Select, Button } from "antd";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddCategoryData } from "../Redux/Category/action";
const { Option } = Select;

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setStatus(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", { name, description, status });
    if (name === "" || description === "") {
      toast.warning("Please Fill The Required Filled!");
    } else {
      dispatch(AddCategoryData({name, description, status})).then((res) => {
        console.log(res)
        if(res?.data?.msg === "category data Added Successfully!"){
            toast.success(res?.data?.msg)
            setTimeout(() => {
                navigate('/category')
            },2000)
        }
        else{
            toast.error(res?.data?.msg)
        }
      })
    }
    setName("");
    setDescription("");
    setStatus("Active");
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col justify-start items-center w-full p-4">
          <ToastContainer position="top-right" reverseOrder={true} />
          <div className="flex items-center w-full mb-4">
            <IoIosArrowRoundBack
              className="text-[30px] cursor-pointer mr-2"
              onClick={() => navigate("/category")}
            />
            <p className="text-lg font-semibold">Add Category</p>
          </div>
          <div className="w-full p-4 border border-gray-300 rounded-lg">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-4 sm:grid"
              //   style={{ height: "100%" }}
            >
              <div className="grid items-center gap-3 sm:flex sm:items-end">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    className="mt-1 w-full p-2"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <Input
                    id="description"
                    type="text"
                    placeholder="Description..."
                    className="mt-1 w-full p-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <Select
                    id="status"
                    defaultValue="Active"
                    onChange={handleChange}
                    className="w-full mt-1 -p-10"
                  >
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <Button
                  className="w-full sm:w-[120px] mr-5 rounded-full"
                  htmlType="Reset"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-purple-900 text-white  rounded-full text-center w-full sm:w-[120px]"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
