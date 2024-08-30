import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";
// import Login from "./Screens/Login";
import Main from "./Screens/Main";
import { DataContext } from "./Store/Context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Sort from "./Context/Second";
import Login from "./Screens/Login";

function App() {
  const navigate = useNavigate();
  const id =
    "842255184184-1h2r8i8lgrl6iel4mm9jplca8jaqkool.apps.googleusercontent.com";
  useEffect(() => {
    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");
    if (username == null || password == null) navigate("/");
    else navigate("/main");
  }, []);

  return (
    <div className="font-mono">
      <GoogleOAuthProvider clientId={id}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/practice" element={<Sort />} />
        </Routes>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
