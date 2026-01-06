import React from "react";
import { useNavigate } from "react-router-dom";
import { MyModal } from "./MyModal";
import { useContext } from "react";
import { MyAcces } from "../context/MyContextProvider";
import { useEffect } from "react";

export const Footer = ({ add }) => {
  const navigate = useNavigate("/");
  const {checker,setChecker} = useContext(MyAcces)
    const {hasAcces,clearKey} = useContext(MyAcces)
  const handleNavi =()=>{
    setChecker(!checker)
    navigate("/")
  }
  return (
    <div className="footer">
      {hasAcces ?
        (add ? (
          <div className="footer-div">
 <button onClick={() => navigate("/cardAdd")}>
            Kártya hozzáadása
          </button>
          
            <button onClick={() => clearKey()}>
            logout
          </button>
          </div>
         
        ) : (
          <button onClick={handleNavi}>Vissza</button>
        )):(
           <MyModal />
        )}

       
    </div>
  );
};
