import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { RxDashboard } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, Modal, Select, Table, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DeleteCategoryData, EditCategoryData, GetCategoryData } from "../Redux/Category/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoWarning } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";

const { Search } = Input;
const { Option } = Select;

const Category = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [deleteData, setDeleteData] = useState([]);
  const [editId, setEditId] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const GetDataFunction = (searchQuery = "") => {
    dispatch(GetCategoryData(searchQuery)).then((res) => {
      let searchData = res?.data?.data;
      if (searchData && searchData.length > 0) {
        searchData.sort((a, b) => a.name.localeCompare(b.name));
      }
      setData(searchData);
    });
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    console.log(deleteData);
    dispatch(DeleteCategoryData(deleteData._id)).then((res) => {
      console.log(res);
      if (res.msg === "category Data Deleted Successfully") {
        toast.success(res.msg);
        GetDataFunction();
      } else {
        toast.error(res.msg);
      }
    });
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (search === "") {
      GetDataFunction();
    } else {
      GetDataFunction(search);
    }
  }, [search, dispatch]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
    },
    {
      title: "Name",
      dataIndex: "Name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span style={{ color: text === "Active" ? "green" : "red" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
    },
  ];

  const rows = data?.map((item) => ({
    key: item._id,
    Id: item._id,
    Name: item.name,
    description: item.description,
    status: item.status,
    actions: (
      <div className="flex">
        <FaEdit
          onClick={() => handleEdit(item)}
          className="cursor-pointer mr-2 text-[20px]"
        />
        <AiOutlineDelete
          onClick={() => handleDelete(item)}
          className="cursor-pointer text-[20px]"
        />
      </div>
    ),
  }));

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk2 = () => {
    console.log(name, description, status);
    console.log(editId);
    if (name === "" || description === "" || status === "") {
      toast.warning("Please Fill The Required Filled!");
    } else {
      dispatch(EditCategoryData(editId, { name, description, status })).then(
        (res) => {
          if (res.msg === "category Data Updated Successfully!") {
            toast.success(res.msg);
            GetDataFunction();
            setIsModalOpen2(false);
          } else {
            toast.error(res.msg);
          }
        }
      );
    }
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const handleEdit = (row) => {
    showModal2();
    setName(row.name);
    setDescription(row.description);
    setStatus(row.status);
    setEditId(row._id);
  };

  const handleDelete = (row) => {
    showModal();
    setDeleteData(row);
  };

  const handleSearch = (value) => {
    setSearch(value);
    GetDataFunction(value);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="p-2">
            <div className="shadow-lg border rounded-xl">
            <div className="flex flex-col md:flex-row items-center justify-between py-3 px-6">
                <div className="flex items-center gap-4">
                  <BsBoxSeam className="text-[20px]" />
                  <h3 className="text-[20px] font-bold">Category</h3>
                </div>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onSearch={handleSearch}
                  placeholder="Search by name...."
                  className=" w-full md:w-[50%] rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => {
                    navigate("/add-category");
                  }}
                  className="bg-purple-900 text-white px-3 py-1 rounded-md hover:bg-purple-800 mt-4 md:mt-0"
                >
                  Add New
                </button>
              </div>
              <div className="overflow-x-auto md:w-[560px] max-[426px]:w-[300px] max-[321px]:w-[230px] lg:w-full">
                <Table columns={columns} dataSource={rows} onChange={onChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Delete"
        width={300}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <div className="flex items-center justify-center gap-5 mt-25">
            <Button onClick={handleCancel} className="rounded bg-slate-200">
              Cancel
            </Button>
            <Button
              onClick={handleOk}
              className="bg-purple-900 rounded text-white hover:border border-purple-900"
            >
              Confirm
            </Button>
          </div>
        )}
        style={{ width: "300px" }}
      >
        <div className="flex items-center justify-center gap-1">
          <IoWarning className="text-[25px] text-red-600" />
          <p className="text-[16px]">Are You sure want to Delete ?</p>
        </div>
      </Modal>
      <Modal
        title="Edit"
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
      >
        <div className="p-4">
          <label className="block mb-2">Name</label>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block mt-4 mb-2">Description</label>
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="block mt-4 mb-2">Status</label>
          <Select
            value={status}
            style={{ width: 120 }}
            onChange={(value) => setStatus(value)}
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </div>
      </Modal>
      <ToastContainer position="top-right" reverseOrder={true} />
    </div>
  );
};

export default Category;
