import React, { useState, useEffect } from "react";
import { images } from "../Assets/Images/Images";
import { IoPencil } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function Main() {
  // useEffect(() => {
  //   let username = localStorage.getItem("username");
  //   let password = localStorage.getItem("password");
  //   const navigate = useNavigate();
  //   if (username == null || password == null) navigate("/");
  // }, []);
  const navigate = useNavigate();
  const [data, setData] = useState(["one", "two", "three"]);
  const [newvalue, setNewvalue] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [strikes, setStrikes] = useState(data.map(() => false));

  function handlenewvalue(e) {
    e.preventDefault();
    addvalue(newvalue);
    setNewvalue("");
  }
  console.log(strikes);
  const handlelogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleremove = (index) => {
    let tempData = [...data];
    let tempStrikes = [...strikes];
    tempData.splice(index, 1);
    tempStrikes.splice(index, 1);
    setData(tempData);
    setStrikes(tempStrikes);
  };

  const addvalue = (value) => {
    if (!data.includes(value)) {
      let temp = [...data];
      temp.push(value);
      setData(temp);
      setStrikes([...strikes, false]);
    } else {
      alert("This value already exists.");
    }
  };

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditValue(data[index]);
  };

  const handleSaveEdit = (index) => {
    if (!data.includes(editValue) || editValue === data[index]) {
      let temp = [...data];
      temp[index] = editValue;
      setData(temp);
      setIsEditing(null);
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
      <button
        onClick={handlelogout}
        className="absolute top-5 right-5 p-2 bg-gradient-to-br from-red-400 to-red-500 rounded text-white"
      >
        Logout
      </button>
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-[500px] h-[700px] shadow-xl rounded-md flex flex-col gap-5 bg-gradient-to-r from-cyan-500 to-blue-500 p-8 text-white">
          <form
            onSubmit={handlenewvalue}
            className="w-full h-20 rounded-md bg-white shadow-md p-4 py-5 text-black flex items-center gap-2"
          >
            <input
              type="text"
              value={newvalue}
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
          <div className="h-full w-full overflow-auto gap-5 flex flex-col-reverse items-end justify-end ">
            {data?.map((item, index) => (
              <div
                key={item}
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
                        {item}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
