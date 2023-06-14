import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useLocalStorage from "./hook/useLocalStorage";
import { userContext } from "./context/User/userContext";
import "react-toastify/dist/ReactToastify.css";
import { Header, Footer } from "./layout";
import { Home, Login, Register, Profile } from "./page";

const App: React.FC = () => {
  const { removeStorage } = useLocalStorage();
  const [show, setShow] = useState<boolean>(false);
  const { user, onUserChange, logout } = useContext(userContext);
  useEffect(() => {
      removeStorage("flag");
      removeStorage("user");
      logout();
  }, [])
  
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={1}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{zIndex:"99999999"}}
      />
      <Header />
      <div style={{ marginTop: "4rem"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
