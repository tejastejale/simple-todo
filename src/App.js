import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";
import Login from "./Screens/Login";
import Main from "./Screens/Main";
import { DataContext } from "./Store/Context";
import Reducer from "./Context/Reducer";
import Sort from "./Context/Second";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");
    if (username == null || password == null) navigate("/");
    else navigate("/main");
  }, []);

  return (
    <div className="font-mono">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/practice" element={<Sort />} />
      </Routes>
    </div>
  );
}

export default App;
