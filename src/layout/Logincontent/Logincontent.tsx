import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Button, Input, Login } from "../../components/index";
import { useNavigate, Link, useLocation } from "react-router-dom";
import loadingBar from "../../assets/svg/loadingBar.svg";
import { AES, enc } from "crypto-ts";
import useLocalStorage from "../../hook/useLocalStorage";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from "../../context/User/userContext";
import "./Login.css";

const Logincontent: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [anonEmail, setAnonEmail] = useState("");
  const [stage, setStage] = useState<"start" | "anon" | "newUser">("start");
  const location: any = useLocation();
  const { setStorage, getStorage } = useLocalStorage();
  const { user, onUserChange, logout } = useContext(userContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  
  const login = async () => {
    try {
      setLoading(true);
      if (loginPassword.length < 6) {
        toast('Password must be at least 6 characters long');
        return;
      } else {
        
      }
      const response = await fetch("https://api-bank-xi.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail.toLowerCase(),
          password: loginPassword,
        }),
      });
  
      if (response.ok) {
        const encryptedData = await response.text();
        const decryptedBytes = AES.decrypt(encryptedData, "07052580111");
        const decryptedData = decryptedBytes.toString(enc.Utf8);
        const data = JSON.parse(decryptedData);
  
        const newdata = {
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          email: data.user.email,
          balance: data.user.amount,
          country: data.user.country,
          state: data.user.state,
          zip: data.user.zip,
          city: data.user.city,
          phone: data.user.phone,
          createdAt: data.user.createdAt,
        };
        const use = AES.encrypt(JSON.stringify(newdata), "07052580111").toString();
        setStorage("flag", use);
        onUserChange(use);
        setLoading(false);
        const result = data.user.password === loginPassword;
  
        if (result) {
          toast("Login successful!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/profile");
        } else {
          toast("Password or user mismatch", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else if (response.status === 400) {
        const errorMessage = await response.text();
        toast(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        throw new Error("Post request failed");
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-background">
      <Login>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sign-in"
        >
          <h2 className="sign-in__title">
            {stage === "start"
              ? "Login"
              : stage === "anon"
              ? "Login"
              : "Login with only Email"}
          </h2>
          {stage === "start" ? (
            <form onSubmit={onSubmit} className="sign-in__form">
              <Input
                placeholder="Email..."
                required
                id="email"
                title="email"
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                }}
              />
              <Input
                placeholder="Password..."
                type="password"
                required
                id="password"
                title="password"
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
              />

              <Button
                style={{ background: "black", width: "100%" }}
                onClick={login}
                type="submit"
              >
                {loading ? (
                  <img width={20} src={loadingBar} alt="loading" />
                ) : (
                  "Sign In"
                )}
              </Button>

              <span
                style={{
                  fontWeight: 300,
                  fontSize: "1.5rem",
                  textAlign: "center",
                  margin: "0 auto",
                  padding: "0 auto",
                  color: "white",
                }}
              >
                OR
              </span>

              <Link to="/register" style={{ color: "black" }}>
                <Button style={{ background: "black", width: "100%" }}>
                  Register
                </Button>
              </Link>
            </form>
          ) : stage === "anon" ? (
            <motion.form
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="form__code"
              onSubmit={onSubmit}
            ></motion.form>
          ) : (
            <motion.form
              className="form__user-name"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onSubmit={onSubmit}
            ></motion.form>
          )}
        </motion.div>
      </Login>
    </div>
  );
};

export default Logincontent;
