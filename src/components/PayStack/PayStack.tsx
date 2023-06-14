import React, { FC, useState, useEffect, useContext, useRef } from "react";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "../../components";
import { userContext } from "../../context/User/userContext";
import useLocalStorage from "../../hook/useLocalStorage";
import { useLoader } from "../../context/Loader/LoaderContext";
import "./PayStack.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AES, enc } from "crypto-ts";

const PayStack: FC = () => {
  const { user, onUserChange } = useContext(userContext);
  const { setStorage, getStorage } = useLocalStorage();
  const { setLoader } = useLoader();
  const navigate = useNavigate();
  const publicKey = "pk_test_15d564a801faed576b19f252904529b00d23a210";
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [showManualInput, setShowManualInput] = useState(false);
  const orderId =
    Date.now().toString(36) + Math.random().toString(36).substr(2);
  const decryptedBytes = AES.decrypt(user, "07052580111");
  const decryptedData = decryptedBytes.toString(enc.Utf8);
  const flag = JSON.parse(decryptedData);

  useEffect(() => {
    setEmail(flag?.email);
  }, []);

  const componentProps = {
    email,
    amount,
    publicKey,
    text: "Pay with Paystack",
    onSuccess: () => {
      nunu();
    },
    onClose: () => toast("Order cancelled"),
  };
  const nunu = async () => {
    try {
      toast(`you successfully deposited ₦${amount/100}`)
      const response = await fetch("https://api-bank-xi.vercel.app/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          totalPrice: amount / 100,
          flag: flag,
          status: "paid",
          timeStamp: new Date(),
          userRef: flag?.email,
        }),
      });

      if (response.ok) {
        const resp = await fetch("https://api-bank-xi.vercel.app/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: flag?.email,
            totalPrice: amount / 100,
          }),
        });
        if (response.ok) {
          const response = await fetch("https://api-bank-xi.vercel.app/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: flag?.email,
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
            const use = AES.encrypt(
              JSON.stringify(newdata),
              "07052580111"
            ).toString();
            setStorage("flag", use);
            onUserChange(use);
          }else {
            console.error("Failed to post invoice data");
          }
        } else {
          console.error("Failed to post invoice data");
        }
      } else {
        console.error("Failed to post invoice data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
    setShowManualInput(false);
  };

  return (
    <>
      <form onSubmit={handleOrder} className="checkout__left__inputs">
        <div className="checkout__left__inputs__two-coloum">
          <div className="checkout__left__inputs__amount-Buttons">
            <Button
              className="button"
              onClick={() => handleAmountSelect(1000 * 100)}
            >
              1000
            </Button>
            <Button
              className="button"
              onClick={() => handleAmountSelect(5000 * 100)}
            >
              5000
            </Button>
            <Button
              className="button"
              onClick={() => handleAmountSelect(10000 * 100)}
            >
              10000
            </Button>
            <Button
              className="button"
              onClick={() => handleAmountSelect(50000 * 100)}
            >
              50000
            </Button>
            <Button className="button" onClick={() => setShowManualInput(true)}>
              Others
            </Button>
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            textAlign: "center",
            fontSize: "25px",
            color: "white",
          }}
        >
          Total: {amount / 100}
        </div>
        {showManualInput && (
          <Input
            type="number"
            id="amount"
            onChange={(e) => setAmount(Number(e.target.value) * 100)}
            placeholder="Enter Amount"
            style={{ margin: "0 80px", color: "black" }}
          />
        )}
        {/* Rest of the form elements */}

        <PaystackButton
          className="checkout__left__inputs__Button Button-default"
          {...componentProps}
        />
      </form>
    </>
  );
};

export default PayStack;
