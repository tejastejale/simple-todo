// src/Login.js
import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GLogin() {
  const navi = useNavigate();
  const [data, setData] = useState(null); // Stores access token response
  const [userInfo, setUserInfo] = useState(null); // Stores user profile data

  // Function to fetch user info using access token
  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userData = await response.json();
      setUserInfo(userData); // Update user info state
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setData(tokenResponse); // Save token response
      fetchUserInfo(tokenResponse.access_token); // Fetch user info
    },
    onError: (error) => console.log("Login failed:", error),
  });

  useEffect(() => {
    console.log("Login Response:", userInfo);
  }, [userInfo]);

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
        {userInfo && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{userInfo.name}</h3>
            <p>{userInfo.email}</p>
            <img
              src={userInfo.picture}
              alt="Profile"
              className="w-16 h-16 rounded-full mx-auto mt-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default GLogin;
