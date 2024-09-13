import { Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";

function Gloginhelp() {
  const [loginData, setLoginData] = useState();
  useEffect(() => {
    console.log(loginData);
  }, [loginData]);
  const login = useGoogleLogin({
    onSuccess: (e) => {
      // console.log(e);
      fetchDetails(e.scope, e.access_token, e.token_type);
    },
    // onSuccess: (e) => console.log(e),
    onError: (e) => console.log(e),
  });
  const fetchDetails = async (url, token, token_type) => {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `${token_type} ${token}`,
      },
    });
    const data = await res.json();
    setLoginData(data);
  };
  return (
    <div>
      <button
        className="w-full bg-white p-2 rounded flex items-center align-middle justify-center gap-2"
        onClick={login}
      >
        <FaGoogle className="text-md " />
        <p className="mt-1">Login</p>
      </button>
    </div>
  );
}

export default Gloginhelp;
