import React from "react";
import { useNavigate } from "react-router-dom";
import { MyModal } from "./MyModal";
import { useContext } from "react";
import { MyAcces } from "../context/MyContextProvider";

export const Footer = ({ add }) => {
  const navigate = useNavigate("/");

    const {hasAcces,clearKey} = useContext(MyAcces)
  const handleclick =()=>{
  }
  return (
    <div className="footer">
      {hasAcces ?
        (add ? (
          <div>
 <button onClick={() => navigate("/cardAdd")}>
            Kártya hozzáadása
          </button>
          
            <button onClick={() => clearKey()}>
            logout
          </button>
          </div>
         
        ) : (
          <button onClick={() => navigate("/")}>Vissza</button>
        )):(
           <MyModal />
        )}

       
    </div>
  );
};
