import React, { useState} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import ViewEmployee from './Components/Employee/ViewEmployee';
import ViewDepartment from './Components/Department/ViewDepartment';
import  { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Components/Navigation/Nav';
import Model from './Components/Model/Model';

function App() {

  const [showModal, setShowModal] = useState(false);
  const [modelContent, setModelContent] = useState(null);

  const handleShowModal = (component) => {
    setModelContent(component);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleToast = ({state, msg}) => {
    if(state === 'success')
    {
      toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else if(state === 'error')
    {
      toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (         
      <div>
        <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/Employee" element={<ViewEmployee handleShowModal={handleShowModal} handleCloseModal={handleCloseModal} handleToast={handleToast} />}/>
          <Route path="/Department" element={<ViewDepartment handleShowModal={handleShowModal} handleCloseModal={handleCloseModal} handleToast={handleToast}/>}/>
          <Route path="/" element={<Home />}/>
        </Routes>                 
        </BrowserRouter>

        <Model modelContent={modelContent} showModal={showModal} handleCloseModal={handleCloseModal}/>
        <ToastContainer />
      </div>
  );
}

export default App;
