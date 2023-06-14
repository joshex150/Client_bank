import { useEffect, useState } from "react";
import { Button, Input } from "../../components/index";
import './home.css'
const Homecontent: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="containing">
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
    </div>
  );
};

export default Homecontent;
