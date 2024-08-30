// src/hooks/useGoogleSignIn.js
import { useEffect } from "react";

const useGoogleSignIn = (clientId, onSuccess, onError) => {
  useEffect(() => {
    const loadGapiScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error("Failed to load Google API script"));
        document.body.appendChild(script);
      });
    };

    const initializeGoogleSignIn = async () => {
      try {
        await loadGapiScript();
        /* global gapi */
        gapi.load("auth2", () => {
          gapi.auth2
            .init({
              client_id: clientId,
              scope: "profile email", // Specify the scopes here
            })
            .then(() => {
              const auth2 = gapi.auth2.getAuthInstance();
              const signInButton = document.getElementById(
                "google-signin-button"
              );
              if (signInButton) {
                auth2.attachClickHandler(signInButton, {}, onSuccess, onError);
              } else {
                console.error("Google Sign-In button not found");
              }
            })
            .catch((error) =>
              console.error("Error initializing Google Auth:", error)
            );
        });
      } catch (error) {
        console.error("Error loading Google API script:", error);
      }
    };

    initializeGoogleSignIn();
  }, [clientId, onSuccess, onError]);
};

export default useGoogleSignIn;
