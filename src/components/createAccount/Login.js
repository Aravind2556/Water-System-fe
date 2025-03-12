import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Import icons
import PowerManageUser from "../../assets/57121.jpg";
import { DContext } from "../../context/Datacontext";

export const Login = () => {
  const apiurl = process.env.REACT_APP_API_URL;
  const { setAuth } = useContext(DContext);
  const [display, setDisplay] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    fetch(`${apiurl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDisplay(data.message);
          setAuth(data.user);
          handlerole(data.user)
         
        } else {
          setDisplay(data.message);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handlerole = (role) => {
    console.log("function role", role)
    if(role.role === 'superadmin'){
      window.location.href='/'
    }
    else if(role.role === 'admin'){
      window.location.href='/'
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        {/* Image Section */}
        <div className="md:w-2/3 p-6 flex justify-center items-center">
          <img
            src={PowerManageUser}
            alt="Login Illustration"
            className=" w-96 rounded-xl"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/3 p-6 flex flex-col justify-center w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4 w-full">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                placeholder="name@example.com"
              />
            </div>

            {/* Password Field with Eye Icon */}
            <div className="relative">
              <label htmlFor="password" className="block text-gray-600 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 top-7"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full  text-white py-2 rounded-md bg-black hover:bg-slate-800 transition"
            >
              Login
            </button>
          </form>

          {display && (
            <p
              className={`mt-3 text-center font-semibold ${
                display === "Login successfully" ? "text-green-500" : "text-red-500"
              }`}
            >
              {display}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

