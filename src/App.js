import React, { useContext } from "react";
import { DContext } from "./context/Datacontext";
import { Routes ,Route} from "react-router-dom";

import CreateUser from '../src/components/Admin.js/CreateUser'
import {Login} from '../src/components/createAccount/Login'
import Navbar from "./components/Navbar";
import AdminDashborad from "./components/Admin.js/AdminDashborad";
import UsersData from "./components/Admin.js/UsersData";
import SimpleLoading from "./components/SimpleLoading";




const App = () => {
  const {Auth}=useContext(DContext)

  if(Auth && Auth === false){
    return <div><SimpleLoading/></div>
  }
  return (

    <div className="container-fluid p-0">

      <Navbar/>

      <Routes>
        <Route path="/" element={Auth?(Auth.role === 'admin' ? <AdminDashborad/>: <UsersData/>) :  <Login/> }></Route>
        <Route path='/CreateUser' element={Auth?.role === 'admin' ? <CreateUser/> : <Login/>}></Route>
      </Routes>

    </div>
   
  );
};

export default App;

