import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { BsBoxSeam } from "react-icons/bs"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, Select, Table, Input } from "antd";
import { IoWarning } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProductData, EditProductData, GetProductData } from "../Redux/Product/action";



const { Search } = Input;
const { Option } = Select;

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [editId, setEditId] = useState("");
  const [mrp, setMrp] = useState("");
  const [packsize, setPacksize] = useState("");
  const [image, setImage] = useState("");
  const [search, setSearch] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const GetDataFunction = (searchQuery = "") => {
    dispatch(GetProductData(searchQuery)).then((res) => {
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
    dispatch(DeleteProductData(deleteData._id)).then((res) => {
      console.log(res);
      if (res.msg === "Product Data Deleted Successfully") {
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

  // useEffect(() => {
  //   GetDataFunction();
  // }, [dispatch]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      sorter: {
        compare: (a, b) => a.Name - b.Name,
        multiple: 3,
      },
    },
    {
      title: "Name",
      dataIndex: "Name",
      sorter: {
        compare: (a, b) => a.Name - b.Name,
        multiple: 3,
      },
    },
    {
      title: "Packsize",
      dataIndex: "packsize",
      sorter: {
        compare: (a, b) => a.packsize - b.packsize,
        multiple: 3,
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: {
        compare: (a, b) => a.category - b.category,
        multiple: 2,
      },
    },
    {
      title: "MRP",
      dataIndex: "mrp",
      sorter: {
        compare: (a, b) => a.mrp - b.mrp,
        multiple: 2,
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      sorter: {
        compare: (a, b) => a.image - b.image,
        multiple: 2,
      },
    },
    {
      title: "status",
      dataIndex: "status",
      sorter: {
        compare: (a, b) => a.status - b.status,
        multiple: 1,
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
    },
  ];

  const rows = data?.map((item) => ({
    Id: item._id,
    Name: item.name,
    packsize: `${item.packsize}`,
    category: item.category,
    mrp: `Rs ${item.mrp}`,
    image: (
      <img
        src={item.image}
        alt={item.name}
        className="h-12 w-12 shadow-xl p-1"
      />
    ),
    status: (
      <span style={{ color: item.status === "Active" ? "green" : "red" }}>
        {item.status}
      </span>
    ),
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      setImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk2 = () => {
    if (
      name === "" ||
      category === "" ||
      status === "" ||
      mrp === "" ||
      packsize === "" ||
      image === ""
    ) {
      toast.warning("Please Fill The Required Filled!");
    } else {
      dispatch(
        EditProductData(editId, {
          name,
          category,
          status,
          mrp,
          packsize,
          image,
        })
      ).then((res) => {
        if (res.msg === "Product Data Updated Successfully!") {
          toast.success(res.msg);
          GetDataFunction();
          setIsModalOpen2(false);
        } else {
          toast.error(res.msg);
        }
      });
    }
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const handleEdit = (row) => {
    showModal2();
    setName(row.name);
    setCategory(row.category);
    setStatus(row.status);
    setEditId(row._id);
    setMrp(row.mrp);
    setPacksize(row.packsize);
    setImage(row.image)
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
      <ToastContainer position="top-right" reverseOrder={true} />
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex w-full">
          <div className="flex flex-col p-2 w-full">
            <div className="shadow-lg border rounded-xl">
              <div className="flex flex-col md:flex-row items-center justify-between py-3 px-6">
                <div className="flex items-center gap-4">
                  <BsBoxSeam className="text-[20px]" />
                  <h3 className="text-[20px] font-bold">Product</h3>
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
                    navigate("/add-products");
                  }}
                  className="bg-purple-900 text-white px-3 py-1 rounded-md hover:bg-purple-800 mt-4 md:mt-0"
                >
                  Add New
                </button>
              </div>
              <div className="overflow-x-auto md:w-[560px] max-[426px]:w-[300px] max-[321px]:w-[230px] lg:w-full">
                <Table
                  columns={columns}
                  dataSource={rows}
                  onChange={onChange}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="m-auto text-center"
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

          <label className="block mt-4 mb-2">Category</label>
          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <label className="block mt-4 mb-2">MRP</label>
          <Input
            placeholder="MRP"
            value={mrp}
            onChange={(e) => setMrp(e.target.value)}
          />

          <label className="block mt-4 mb-2">Packsize</label>
          <Input
            placeholder="Packsize"
            value={packsize}
            onChange={(e) => setPacksize(e.target.value)}
          />

          <label className="block mt-4 mb-2">Image</label>
          <div className="flex items-center">
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
                className="w-[10%] h-[10%]"
              />
            )}
          </div>

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
    </div>
  );
};

export default Products;
