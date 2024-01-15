// Navigation.js
import React from "react";

const Navigation = ({ onRouteChange, route }) => {
  const handleSignOut = () => {
    console.log("Sign Out button clicked");
    onRouteChange("Signin");
  };

  return (
    <nav className="Navigation">
      {route === "Home" ? (
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
      ) : null}
    </nav>
  );
};

export default Navigation;

