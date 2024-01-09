// Navigation.js
import React from "react";

const Navigation = ({ onRouteChange }) => {
  const handleSignOut = () => {
    console.log("Sign Out button clicked");
    onRouteChange("Signin");
  };

  return (
    <nav className="Navigation">
      {/* Your navigation content */}
      <button onClick={handleSignOut} className="sign-out-button">
        Sign Out
      </button>
    </nav>
  );
};

export default Navigation;
