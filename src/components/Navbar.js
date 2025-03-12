import React, { useContext } from "react";

import { DContext } from "../context/Datacontext";

const Navbar = () => {

  const apiurl = process.env.REACT_APP_API_URL;
  const { Auth } = useContext(DContext);



  console.log("Auth By navbar:", Auth);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${apiurl}/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        window.location.href='/'
        alert(data.message);
      }

    } catch (error) {
      console.error("Logout error:", error);
      alert("Error during logout. Please try again.");
    }
  };

  return (
    <nav className=" bg-sky-400 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-primary text-black">
         Water Testing
        </a>

        {/* Auth Button */}
        <button
          onClick={()=>Auth?handleLogout():window.location.href="/login"}
          className={`px-4 py-2 text-white rounded-md transition-all ${
            Auth ? "bg-red-500 hover:bg-red-600" : "bg-black hover:bg-slate-800"
          }`}
        >
          {Auth ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
