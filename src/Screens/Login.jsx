import React, { useEffect, useState } from "react";
import { images } from "../Assets/Images/Images";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
function Login() {
  const [username, setUsername] = useState("");
  const [usernamestate, setUsernamestate] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordstate, setPasswordstate] = useState(false);
  const [error, setError] = useState(false);
  const [inputerror, setInputError] = useState(false);
  const navigate = useNavigate();
  const data = [
    {
      username: "admin",
      password: "admin@1",
    },
  ];

  function handleSubmit(event) {
    event.preventDefault();
    if (password.length <= 5) setError(true);
    else {
      for (let i = 0; i <= data.length - 1; i++) {
        if (data[i].username === username && data[i].password === password) {
          navigate("/main");
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
        } else {
          console.log("incorrect inputs");
          if (data[i].username !== username && data[i].password !== password) {
            setPasswordstate(true);
            setUsernamestate(true);
          }
          if (data[i].username === username) {
            setPasswordstate(true);
            setInputError(true);
          }
          if (data[i].password === password) {
            setUsernamestate(true);
            setInputError(true);
          }
        }
      }
    }
  }

  const style = {
    background: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${images[0]["blue-background2"]})`,
  };
  return (
    <motion.div className="w-screen h-screen" style={style} init>
      <div className="flex justify-center items-center w-full h-full">
        <AnimatePresence>
          <motion.form
            initial={{ scale: "80%", opacity: 0.2 }}
            animate={{ scale: "100%", opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            exit={{ scale: "80%", opacity: 0.2 }}
            key="form"
            onSubmit={handleSubmit}
            className="w-96 h-fit shadow-xl scale-90 md:scale-100 rounded-md flex flex-col justify-start p-8 gap-4 bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            <p className="text-3xl text-center text-white">Login</p>
            <div className="w-full h-full flex flex-col justify-center gap-5">
              <div className="flex flex-col gap-1">
                <p className="text-white">Username</p>
                <input
                  type="text"
                  className={`border rounded p-2 focus:outline-0  bg-transparent text-white ${
                    usernamestate ? "border-red-500" : ""
                  }`}
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-white">Password</p>
                <input
                  type="password"
                  className={`border rounded p-2 focus:outline-0  bg-transparent text-white ${
                    passwordstate ? "border-red-500" : ""
                  }`}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 text-center">
                  Password should not be less than 5 characters !
                </p>
              )}
              {inputerror && (
                <p className="text-sm text-red-500 text-center">
                  Provide Correct Inputs !
                </p>
              )}
            </div>
            <button className="bg-white p-2 rounded-md" type="submit">
              Let's Go
            </button>
          </motion.form>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Login;
