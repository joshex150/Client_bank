import React from "react";
import "./Footer.css";
import { Input } from "../../components";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loadingBar from "../../assets/svg/loadingBar.svg";
import useLocalStorage from "../../hook/useLocalStorage";
import { AES, enc } from "crypto-ts";
import { userContext } from "../../context/User/userContext";

const Footer = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const {getStorage} = useLocalStorage();
  const mail = getStorage("flag");
  const { user, onUserChange, logout } = useContext(userContext);
  const subscribe = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://api-bank-xi.vercel.app/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        
        const data = await response.json();
        setLoading(false);
        toast("Registration successful!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else if (response.status === 400) {
        const errorMessage = await response.text();
        setLoading(false);
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
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const decryptedBytes = AES.decrypt(user, "07052580111");
        const decryptedData = decryptedBytes.toString(enc.Utf8);
        const mail = JSON.parse(decryptedData);
        if (!mail || !mail.email) {
          setSubscribed(false);
          return;
        }
  
        const response = await fetch("https://api-bank-xi.vercel.app/subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: mail.email,
          }),
        });
  
        if (response.ok) {
          setSubscribed(true);
        } else if (response.status === 204) {
          setSubscribed(false);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    checkSubscription();
  }, [pathname, mail]);
  

  return (
    <div style={{  height: "auto", marginTop: pathname === '/register'||'/login' ? "-55px":"-45px"}}>
      {!subscribed && (
        <div className="solo-card">
          <Input
            className="newsletter"
            placeholder="E-mail"
            id="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <button className="button-sec" onClick={subscribe}>
            {loading ? (
              <img width={20} src={loadingBar} alt="loading" />
            ) : (
              "Sign up for newsletter"
            )}
          </button>
        </div>
      )}
      <div className="footer" style={{ marginTop: subscribed ? "7rem" : "0" }}>
        <div className="footer__addr">
          <h2>Contact</h2>
          <address>
            Somewhere in Port Harcourt.
            <br />
            <br />
            <span style={{ color: "white" }}>Email Us</span>
            <br />
            <br />
            <a
              style={{ color: "#999999", textDecoration: "none" }}
              href="mailto:Joshex150@gmail.com"
            >
              Joshex150@gmail.com
            </a>
          </address>
        </div>
        <ul className="footer__nav">
          <li className="nav__item">
            <h2 className="nav__title">Media</h2>
            <ul className="nav__ul">
              <li>
                <a href="#">Online</a>
              </li>
              <li>
                <a href="#">Print</a>
              </li>
              <li>
                <a href="#">Alternative Ads</a>
              </li>
            </ul>
          </li>
          <li className="nav__item nav__item--extra">
            <h2 className="nav__title">Technology</h2>
            <ul className="nav__ul">
              <li>
                <a href="#">Automation</a>
              </li>
              <li>
                <a href="#">Artificial Intelligence</a>
              </li>
              <li>
                <a href="#">IoT</a>
              </li>
            </ul>
          </li>
          <li className="nav__item">
            <h2 className="nav__title">Legal</h2>
            <ul className="nav__ul">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">Sitemap</a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="legal">
          <div className="legal__links" style={{ textAlign: "right" }}>
            <p>&copy; 2023. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
