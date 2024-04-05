import React, { useState } from "react";
import { Input, Select, Button } from "antd";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AddProductData } from "../Redux/Product/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;

const AddProducts = () => {
  const [category, setCategory] = useState("Milk");
  const [name, setName] = useState("");
  const [packsize, setpacksize] = useState("");
  const [mrp, setMrp] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null); // State to hold the image
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setStatus(value);
  };

  const handleChange2 = (value) => {
    setCategory(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      setImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", {
      category,
      name,
      packsize,
      mrp,
      status,
      image,
    });
    if (
      name === "" ||
      category === "" ||
      mrp === "" ||
      image === null ||
      packsize === ""
    ) {
      toast.warning("Please Fill All The Required Filled");
    } else {
      dispatch(
        AddProductData({ name, category, mrp, status, image, packsize })
      ).then((res) => {
        console.log(res);
        if (res?.data?.msg === "Product data Added Successfully!") {
          toast.success(res?.data?.msg);
          setTimeout(() => {
            navigate("/products");
          }, 2000);
        } else {
          toast.error(res?.data?.msg);
        }
      });
    }
    // Reset form fields
    setName("");
    setpacksize("");
    setMrp("");
    setStatus("Active");
    setCategory("Milk");
    setImage(null);
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
              onClick={() => navigate("/products")}
            />
            <p className="text-lg font-semibold">Add Product</p>
          </div>
          <div className="w-full p-4 border border-gray-300 rounded-lg">
            <form onSubmit={handleSubmit} className="">
              <div className="grid grid-cols-1 gap-4 sm:grid sm:grid-cols-3 sm:gap-3">
                <div className="w-full">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category
                  </label>
                  <Select
                    id="status"
                    defaultValue="Milk"
                    onChange={handleChange2}
                    className="w-full"
                  >
                    <Option value="Milk">Milk</Option>
                    <Option value="Fruits">Fruits</Option>
                  </Select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Product Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    className="w-full"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="packsize"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Pack Size
                  </label>
                  <Input
                    id="packsize"
                    type="text"
                    placeholder="Pack Size"
                    value={packsize}
                    className="w-full"
                    onChange={(e) => setpacksize(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="mrp"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    MRP
                  </label>
                  <Input
                    id="mrp"
                    type="text"
                    placeholder="MRP"
                    value={mrp}
                    className="w-full"
                    onChange={(e) => setMrp(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {image && (
                    <img
                      src={image}
                      alt="Selected"
                      style={{ maxWidth: "10%", marginTop: "10px" }}
                    />
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Status
                  </label>
                  <Select
                    id="status"
                    defaultValue="Active"
                    onChange={handleChange}
                    className="w-full"
                  >
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end mt-8 sm:w-full">
                <Button
                  className="w-full sm:w-[120px] mr-5 rounded-full"
                  htmlType="Reset"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-purple-900 text-white rounded-full text-center w-full sm:w-[120px]"
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

export default AddProducts;
