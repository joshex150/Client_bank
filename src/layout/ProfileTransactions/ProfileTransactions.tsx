import React, { useContext, useEffect, useState } from "react";
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
  const [invoice, setinvoice] = useState<any[]>([]);
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(
          "https://api-bank-xi.vercel.app/transactions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: flag?.email.toLowerCase(),
            }),
          }
        );

        if (response.ok) {
          const invoiceRows = await response.text();
          setinvoice(JSON.parse(invoiceRows));
        } else {
          console.error("Failed to fetch invoices");
        }
      } catch (error) {
        console.error("Failed to fetch invoices", error);
      }
    };
    fetchInvoices();
  }, []);

  const formatTimestamp = (timestamp: string) => {
   const date = new Date(timestamp);
   const formattedDate = date.toLocaleDateString("en-GB", {
     day: "2-digit",
     month: "2-digit",
     year: "numeric",
   });
   const formattedTime = date.toLocaleTimeString("en-GB", {
     hour: "2-digit",
     minute: "2-digit",
   });
   return `${formattedDate} ${formattedTime}`;
 };
  return (
   <div style={{ marginTop: "20px" }}>
      {invoice.length > 0 ? (
        invoice.map((inv: any, i) => (
          <div className="profile-transaction" key={i}>
            <span className="timestamp">{formatTimestamp(inv.timeStamp)}</span>
            <span className="price">+{inv.totalPrice}</span>
          </div>
        ))
      ) : (
        <div className="no-deposit">No deposit yet</div>
      )}
    </div>
  );
};

export default ProfileTransactions;
