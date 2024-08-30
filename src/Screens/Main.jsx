import React, { useState, useEffect } from "react";
import { images } from "../Assets/Images/Images";
import { IoPencil } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import axios from "axios";
import ButtonComponent from "../Components/Button";

function Main() {
  const navigate = useNavigate();
  const [apidata, setApidata] = useState(null);
  const [sorteddata, setSortedData] = useState(apidata);
  const [findinput, setFindInput] = useState("");
  const [data, setData] = useState([]);
  const [newvalue, setNewvalue] = useState("");
  const [isloading, setIsloading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [strikes, setStrikes] = useState([]);
  useEffect(() => {
    get();
  }, []);

  async function get() {
    await axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        setApidata(response.data);
        setData(response.data.map((item) => item.title));
        setStrikes(response.data.map(() => false));
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    apidata &&
      setSortedData(
        apidata.filter(
          (data) =>
            data.title.includes(findinput) || data.id.includes(findinput)
        )
      );
  }, [findinput]);

  async function apidelete(id) {
    await axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    get();
  }

  async function post(value) {
    await axios
      .post("http://localhost:3000/posts", { title: value })
      .then((res) => console.log(res));
    get();
  }

  async function patch(id, value) {
    await axios
      .patch(`http://localhost:3000/posts/${id}`, { title: value })
      .then((res) => console.log(res));
    get();
  }

  async function handlenewvalue(e) {
    e.preventDefault();
    if (data.includes(newvalue)) {
      const index = data.indexOf(newvalue);
      alert("This value already exists.");

      setIsEditing(index);
      setEditValue(newvalue);
      setNewvalue("");
      return;
    }
    await post(newvalue);
    setNewvalue("");
  }

  const handlelogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleremove = (index) => {
    let itemId = apidata[index].id;
    let tempData = [...data];
    let tempStrikes = [...strikes];
    tempData.splice(index, 1);
    tempStrikes.splice(index, 1);
    setData(tempData);
    setStrikes(tempStrikes);
    apidelete(itemId);
  };

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditValue(data[index]);
  };

  const handleSaveEdit = async (index) => {
    const itemId = apidata[index].id;

    if (!data.includes(editValue) || editValue === data[index]) {
      let temp = [...data];
      temp[index] = editValue;
      setData(temp);
      setIsEditing(null);
      await patch(itemId, editValue);
    } else {
      alert("This value already exists.");
    }
  };

  const handleStrike = (index) => {
    let tempStrikes = [...strikes];
    tempStrikes[index] = !tempStrikes[index];
    setStrikes(tempStrikes);
  };

  return (
    <div
      className="w-screen h-screen"
      style={{
        background: "contain",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${images[0]["blue-background2"]})`,
      }}
    >
      {/* {createPortal(
        <button
          onClick={handlelogout}
          className="absolute top-5 right-5 p-2 bg-gradient-to-br from-red-400 to-red-500 rounded text-white"
        >
          Logout
        </button>,
        document.getElementById("btn")
      )} */}
      <ButtonComponent
        onClick={handlelogout}
        className="absolute z-50 top-5 right-5 p-2 cursor-pointer bg-gradient-to-br from-red-400 to-red-500 rounded text-white"
      >
        Logout
      </ButtonComponent>

      <div className="flex justify-center items-center w-full h-full md:scale-100 scale-75">
        <div className="w-[500px] h-[700px] shadow-xl rounded-md flex flex-col gap-5 bg-gradient-to-r from-cyan-500 to-blue-500 p-8 text-white">
          <form
            onSubmit={handlenewvalue}
            className="w-full h-20 rounded-md bg-white shadow-md p-4 py-5 text-black flex items-center gap-2"
          >
            <input
              type="text"
              value={newvalue}
              placeholder="Add"
              onChange={(e) => setNewvalue(e.target.value)}
              className="w-full h-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
            <button className="w-fit h-full flex items-center p-2 rounded bg-gradient-to-br from-green-300 to-green-500 cursor-pointer">
              <IoIosAddCircleOutline
                className="text-xl text-white"
                type="submit"
              />
            </button>
          </form>
          <input
            type="text"
            value={findinput}
            placeholder="Find"
            onChange={(e) => setFindInput(e.target.value)}
            className="w-full h-fit p-2 border rounded focus:outline-none text-black focus:border-blue-500"
          />
          {isloading ? (
            <div className="w-full h-20 text-center rounded-md  flex items-center text-black justify-center text-xl bg-white">
              <p className="text-center">loading....</p>
            </div>
          ) : (
            <div className="h-full w-full overflow-auto gap-5 flex flex-col items-center justify-start ">
              {findinput !== ""
                ? sorteddata?.map((item, index) => (
                    <motion.div
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -100, opacity: 0 }}
                      transition={{
                        ease: "easeInOut",
                        duration: 0.5,
                        delay: index * 0.3,
                      }}
                      key={item.id}
                      className="h-fit w-full flex flex-col gap-2 justify-start shadow"
                    >
                      <div className="w-full h-20 rounded-md bg-white shadow-md p-4 py-5 text-black flex items-center gap-2">
                        {isEditing === index ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full h-full p-2 border rounded focus:outline-none focus:border-blue-500"
                          />
                        ) : (
                          <div className="flex w-full items-center">
                            <input
                              type="checkbox"
                              onChange={() => handleStrike(index)}
                              className="h-full w-fit p-4 accent-emerald-400"
                            />
                            <p
                              className={`w-full h-full p-2 ${
                                strikes[index] ? "line-through" : ""
                              }`}
                            >
                              {item.title}
                            </p>
                          </div>
                        )}
                        {isEditing === index ? (
                          <button
                            onClick={() => handleSaveEdit(index)}
                            className="border w-fit h-full flex items-center p-2 rounded bg-gradient-to-br from-green-300 to-green-500 cursor-pointer"
                          >
                            Save
                          </button>
                        ) : (
                          <p
                            onClick={() => handleEdit(index)}
                            className="border w-fit h-full flex items-center p-2 rounded bg-gradient-to-br from-amber-300 to-amber-500 cursor-pointer"
                          >
                            <IoPencil className="text-xl text-white" />
                          </p>
                        )}
                        <p
                          onClick={() => handleremove(index)}
                          className="border w-fit h-full flex items-center p-2 rounded bg-gradient-to-br from-red-400 to-red-500 cursor-pointer"
                        >
                          <FaTrashAlt className="text-xl text-white" />
                        </p>
                      </div>
                    </motion.div>
                  ))
                : apidata?.map((item, index) => (
                    <motion.div
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -100, opacity: 0 }}
                      transition={{
                        ease: "easeInOut",
                        duration: 0.5,
                        delay: index * 0.3,
                      }}
                      key={item.id}
                      className="h-fit w-full flex flex-col gap-2 justify-start shadow"
                    >
                      <div className="w-full h-20 rounded-md bg-white shadow-md p-4 py-5 text-black flex items-center gap-2">
                        {isEditing === index ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full h-full p-2 border rounded focus:outline-none focus:border-blue-500"
                          />
                        ) : (
                          <div className="flex w-full items-center">
                            <input
                              type="checkbox"
                              onChange={() => handleStrike(index)}
                              className="h-full w-fit p-4 accent-emerald-400"
                            />
                            <p
                              className={`w-full h-full p-2 ${
                                strikes[index] ? "line-through" : ""
                              }`}
                            >
                              {item.title}
                            </p>
                          </div>
                        )}
                        {isEditing === index ? (
                          <button
                            onClick={() => handleSaveEdit(index)}
                            className="border w-fit h-full flex items-center p-2 rounded bg-gradient-to-br from-green-300 to-green-500 cursor-pointer"
                          >
                            Save
                          </button>
                        ) : (
                          <p
                            onClick={() => handleEdit(index)}
                            className="border w-fit h-full flex items-center p-2 rounded bg-gradient-to-br from-amber-300 to-amber-500 cursor-pointer"
                          >
                            <IoPencil className="text-xl text-white" />
                          </p>
                        )}
                        <p
                          onClick={() => handleremove(index)}
                          className="border w-fit h-full flex items-center p-2 rounded bg-gradient-to-br from-red-400 to-red-500 cursor-pointer"
                        >
                          <FaTrashAlt className="text-xl text-white" />
                        </p>
                      </div>
                    </motion.div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
