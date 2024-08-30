// src/Login.js
import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function GLogin() {
  const navi = useNavigate();
  const [data, setData] = useState("");
  const login = useGoogleLogin({
    onSuccess: (e) => console.log(setData(e)),
    onError: (e) => console.log(e),
  });
  useEffect(() => console.log(data), [data]);

  const id =
    "842255184184-1h2r8i8lgrl6iel4mm9jplca8jaqkool.apps.googleusercontent.com";

  return (
    <div className="flex items-center justify-center h-fit bg-gray-100 rounded-lg">
      <div className="bg-white p-0 rounded-md shadow-lg w-80 text-center">
        <div
          id="google-signin-button"
          onClick={() => login()}
          className="cursor-pointer bg-white text-black py-2 px-4 rounded-md"
        >
          Sign in with Google
        </div>
      </div>
    </div>
  );
}

export default GLogin;
