import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { RxDashboard } from "react-icons/rx";
import { BsCardChecklist, BsCardList, BsPencil, BsTrash } from "react-icons/bs"; // Importing icons
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoryData } from "../Redux/Category/action";

const Category = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const GetDataFunction = () => {
    dispatch(GetCategoryData()).then((res) => {
      setData(res?.data?.data);
    });
  };

  console.log(data);

  useEffect(() => {
    GetDataFunction();
  }, [dispatch]);

  const columns = [
    {
      key: "id",
      name: (
        <>
          <span>ID</span> <BsCardChecklist />
        </>
      ),
    },
    { key: "title", name: "name" },
    { key: "description", name: "Description" },
    { key: "status", name: "Status" },
    {
      key: "actions",
      name: "Actions",
      formatter: ({ row }) => row.actions,
    },
  ];
  

  const rows = data.map((item) => ({
    id: item._id,
    title: item.name,
    description: item.description,
    status: item.status,
    actions: (
      <div className="flex">
        <FaEdit onClick={() => handleEdit(item)} className="cursor-pointer mr-2 text-[20px]" />
        <AiOutlineDelete onClick={() => handleDelete(item)} className="cursor-pointer" />
      </div>
    )
  }));
  

  const handleEdit = (row) => {
    // Implement edit functionality
    console.log("Edit clicked for row:", row);
  };

  const handleDelete = (row) => {
    // Implement delete functionality
    console.log("Delete clicked for row:", row);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex border border-red-800 w-full">
          <div className="flex flex-col p-2 border border-red-800 w-full">
            <div className="shadow-lg border border-red-800">
              <div className="flex items-center justify-between py-3 px-6">
                <div className="flex items-center gap-4">
                  <RxDashboard className="text-[20px]" />
                  <h3 className="text-[20px] font-bold">Category</h3>
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-gray-300 w-[50%] rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                />
                <button className="bg-purple-900 text-white px-3 py-1 rounded-md hover:bg-purple-800">
                  Add New
                </button>
              </div>
              <div className="overflow-x-auto">
                <DataGrid columns={columns} rows={rows} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
