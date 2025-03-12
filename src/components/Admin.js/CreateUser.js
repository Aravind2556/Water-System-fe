import React, { useState } from "react";
import PowermangeUser from "../../assets/hand-medical-glove-pointing-virtual-screen-medical-technology.jpg";
import { Eye, EyeOff } from "lucide-react";

export const CreateAdmin = () => {
  const apiurl = process.env.REACT_APP_API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Separate state

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    userType: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData) {
      fetch(`${apiurl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);

          if (data.success === true) {
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log("Troubleing Error to Create Admin may be network issue please try again later", err);
          alert("Troubleing Error to Create Admin may be network issue please try again later");
        });
    } else {
      alert("Data value not declared");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 p-6 justify-center items-center">
          <img
            src={PowermangeUser}
            alt="Register Illustration"
            className="w-full object-cover rounded-lg"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Contact</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                placeholder="1234567890"
              />
            </div>

            {/* Password Field with Eye Icon */}
            <div className="relative">
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
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

            {/* Confirm Password Field with Eye Icon */}
            <div className="relative">
              <label className="block text-gray-600 mb-1">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 pr-10"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 top-7"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Register
            </button>
          </form>


        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;