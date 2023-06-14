import { FC, useContext } from 'react';
import './Loader.css';
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../context/User/userContext";

interface IProps {
  color?: 'white' | 'primary';
}



const Loader: FC<IProps> = ({ color = 'primary' }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  if (pathname === "/profile" && !user){
    setTimeout(() => {
      navigate("/login")
    }, 100);
  }
  return (
    <div className={`lds-roller ${color}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
