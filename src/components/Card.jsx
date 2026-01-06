import React from "react";
import elso from "../assets/elsooldal.png";
import hatulso from "../assets/hatulso.png";
import { useContext } from "react";
import { MyAcces } from "../context/MyContextProvider";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CiEdit, CiStop1 } from "react-icons/ci";


export const Card = ({ obj }) => {
    const navigate = useNavigate()
    const {hasAcces,setCard} = useContext(MyAcces)
   
    const handleCardAdd = ()=>{
        setCard(obj)
        navigate("/cardAdd")
    }
  return (
    <>
      <div className="flip-card-container">
        <div className="flip-card">
          <div className="card-front">
            <figure>
              <div ></div>
              <img src={elso} alt="Brohm Lake" />
              <figcaption></figcaption>
            </figure>

            <div className="szoveg">{obj.kerdes}</div>
        
          </div>

          <div className="card-back">
            <figure>
              <img src={hatulso} alt="Brohm Lake" />
              
              
            </figure>

            <div className="szoveg">{obj.valasz}</div>
            <div className="le">
               {hasAcces && (
                <button  onClick={handleCardAdd}><CiEdit /></button>
            )}
              <button ><CiStop1 /></button>

            </div>
            
               

          </div>
        </div>
      </div>
    </>
  );
};
