import React, { useState } from "react";
import { images } from "../Assets/Images/Images";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ButtonComponent from "../Components/Button";
import GLogin from "./Glogin";
import Gloginhelp from "../Components/Gloginhelp";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    usernameError: false,
    passwordError: false,
    passwordLen: false,
    inputError: false,
  });

  const navigate = useNavigate();

  const data = [
    {
      username: "admin",
      password: "admin@1",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length <= 5) {
      setError((prevError) => ({
        ...prevError,
        passwordLen: true,
        passwordError: false,
        inputError: false,
      }));
      return;
    }

    const user = data.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      navigate("/main");
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      const isUsernameValid = data.some((user) => user.username === username);
      const isPasswordValid = data.some((user) => user.password === password);

      setError({
        usernameError: !isUsernameValid,
        passwordError: !isPasswordValid,
        passwordLen: false,
        inputError: true,
      });
    }
  };

  const style = {
    background: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${images[0]["blue-background2"]})`,
  };

  return (
    <motion.div className="w-screen h-screen" style={style}>
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
                <label htmlFor="username" className="text-white">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className={`border rounded p-2 focus:outline-0 bg-transparent text-white ${
                    error.usernameError ? "border-red-500" : ""
                  }`}
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError((prevError) => ({
                      ...prevError,
                      usernameError: false,
                      inputError: false,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-white">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={`border rounded p-2 focus:outline-0 bg-transparent text-white ${
                    error.passwordError || error.passwordLen
                      ? "border-red-500"
                      : ""
                  }`}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError((prevError) => ({
                      ...prevError,
                      passwordError: false,
                      passwordLen: false,
                      inputError: false,
                    }));
                  }}
                />
              </div>
              {error.passwordLen && (
                <p className="text-sm text-red-500 text-center">
                  Password should not be less than 5 characters!
                </p>
              )}
              {error.inputError && (
                <p className="text-sm text-red-500 text-center">
                  Provide Correct Inputs!
                </p>
              )}
            </div>
            {/* <GLogin /> */}
            <Gloginhelp />
            <ButtonComponent className="bg-white p-2 rounded-md" type="submit">
              Let's Go
            </ButtonComponent>
          </motion.form>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Login;
