import React from "react";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Button, Input, Login } from "../../components/index";
import { useNavigate, Link, useLocation } from "react-router-dom";
import loadingBar from "../../assets/svg/loadingBar.svg";
import useLocalStorage from "../../hook/useLocalStorage";
import { Country, State, City } from "country-state-city";
import Select, { StylesConfig } from "react-select";
import format from "date-fns/format";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from "../../context/User/userContext";
import { AES, enc } from "crypto-ts";
import "./Register.css";

type MyOptionType = {
  label: string;
  value: string;
};

const Registercontent: React.FC = (props) => {
  const navigate = useNavigate();
  const { setStorage, getStorage } = useLocalStorage();
  const [loading, setLoading] = useState<boolean>(false);
  const [Email, setLoginEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const countries: any = Country.getAllCountries();
  const states: any = State.getStatesOfCountry(country);
  const cities: any = City.getAllCities();
  const { onUserChange } = useContext(userContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const register = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://api-bank-xi.vercel.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: Firstname,
          lastname: Lastname,
          email: Email.toLowerCase(),
          password: Password,
          country: country,
          state: state,
          zip: zip,
          phone: Phone,
          amount: 0,
          createdAt: Date(),
        }),
      });

      if (response.ok) {
        
        const dat = await response.json();
        const decryptedBytes = AES.decrypt(dat, "07052580111");
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
        navigate("/profile");
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
    }
  };

  let options: any = [];
  countries.map((m: any, i: any) => {
    let count = {
      value: m.isoCode,
      label: m.name,
    };
    options.push(count);
  });

  let option: any = [];
  states.map((n: any, i: any) => {
    let cite = {
      value: n.name,
      label: n.name,
    };
    option.push(cite);
  });

  const customControlStyles: any = {
    border: "0.1rem solid rgba(0, 0, 0, 0.2)",
    borderRadius: "0.5rem",
    marginTop: "-0.7px",
    fontSize: "auto",
    paddingLeft: "1rem",
    minHeight: "50.5px",
    minWidth: "174px",
  };

  type IsMulti = false;
  const selectStyle: StylesConfig<MyOptionType, IsMulti> = {
    control: (provided, state) => {
      return {
        ...provided,
        ...customControlStyles,
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        backgroundColor: "none",
        color: "black",
      };
    },
  };
  return (
    <div className="login-background">
      <Login>
        <>
          <form onSubmit={onSubmit} className="checkout__left__inputs">
            <h2 className="sign-in__title">Register</h2>
            <div className="checkout__left__inputs__two-coloum">
              <Input
                required
                type="text"
                id="Email"
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                }}
                className="checkout__left__input"
                placeholder="Email"
              />
              <Input
                required
                type="text"
                id="First"
                onChange={(e) => setFirstname(e.target.value)}
                value={Firstname}
                className="checkout__left__input"
                placeholder="Firstname"
              />
              <Input
                type="text"
                id="Last"
                onChange={(e) => setLastname(e.target.value)}
                value={Lastname}
                className="checkout__left__input-short"
                placeholder="Lastname"
              />
            </div>

            <div className="checkout__left__inputs__two-coloum">
              <Select
                styles={selectStyle}
                id="Country_name"
                options={options}
                onChange={(value: any) => setCountry(value.value || "")}
                placeholder="Country"
              />
              <Select
                styles={selectStyle}
                id="State_name"
                options={option}
                onChange={(value: any) => setState(value.value || "")}
                placeholder="State"
              />
              <Input
                type="number"
                name="zipCode"
                id="zip_code"
                onChange={(e) => setZip(e.target.value)}
                className="checkout__left__input-short"
                placeholder="Zip Code"
              />
            </div>
            <div className="checkout__left__inputs__two-coloum">
              <Input
                type="address"
                id="Phone"
                onChange={(e) => setPhone(e.target.value)}
                name="phone"
                // value={values.address}
                className="checkout__left__input"
                placeholder="Phone Number"
              />
              <Input
                type="address"
                id="Password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                // value={values.address}
                className="checkout__left__input-short"
                placeholder="Password"
              />
            </div>
            <Button onClick={register} style={{ background: "black" }}>
              {" "}
              {loading ? (
                <img width={20} src={loadingBar} alt="loading" />
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </>
      </Login>
    </div>
  );
};

export default Registercontent;
