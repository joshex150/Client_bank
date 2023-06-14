import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../hook/useLocalStorage";
import { userContext } from "../../context/User/userContext";
import { AES, enc } from "crypto-ts";
import "./style.scss";

const ProfileTransactions: React.FC = () => {
  const { removeStorage } = useLocalStorage();
  const { user, onUserChange, logout } = useContext(userContext);
  const decryptedBytes = AES.decrypt(user, "07052580111");
  const decryptedData = decryptedBytes.toString(enc.Utf8);
  const flag = decryptedData ? JSON.parse(decryptedData) : {};
  const [invoice, setinvoice] = useState<any>();
  const fetchInvoices = async () => {
    try {
      const response = await fetch("https://api-bank-xi.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: flag?.email.toLowerCase(),
        }),
      });

      if (response.ok) {
        const invoiceRows = await response.json();
        setinvoice(invoiceRows)
        console.log(invoice)
      } else {
        console.error("Failed to fetch invoices");
      }
    } catch (error) {
      console.error("Failed to fetch invoices", error);
    }
  };

  return <div>ProfileTransactions</div>;
};

export default ProfileTransactions;
