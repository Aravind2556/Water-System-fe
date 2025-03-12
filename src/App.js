import React, { useContext } from "react";
import { DContext } from "./context/Datacontext";
import { Routes ,Route} from "react-router-dom";

import CreateUser from '../src/components/Admin.js/CreateUser'
import {Login} from '../src/components/createAccount/Login'
import Navbar from "./components/Navbar";
import AdminDashborad from "./components/Admin.js/AdminDashborad";
import WaterLimit from "./components/Admin.js/WaterLimit";




const App = () => {
  const {Auth}=useContext(DContext)
  return (

    <div>

      <Navbar/>

      <Routes>
        <Route path="/" element={Auth?.role === 'admin' ? <AdminDashborad/> : <Login/> }></Route>
        <Route path='/CreateUser' element={Auth?.role === 'admin' ? <CreateUser/> : <Login/>}></Route>
        <Route path="/user/:id" element={Auth?.role === 'admin' ? <WaterLimit/> : <Login/>}></Route>
        
      </Routes>

    </div>
   
  );
};

export default App;

