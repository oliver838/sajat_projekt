import React from 'react'
import elso from '../assets/elsooldal.png';
import hatulso from '../assets/hatulso.png';

export const Card = ({obj}) => {
    console.log("aknskadn");
  
    console.log(obj);
    
  return (<>
    <div className="flip-card-container">
        <div className="flip-card">

            <div className="card-front">
            <figure>
                
                <div className="img-bg"></div>
                <img src={elso} alt="Brohm Lake"/>
                <figcaption></figcaption>
            </figure>

            <div className='szoveg'>{obj.kerdes}</div>
            </div>

            <div className="card-back">
            <figure>
                <div className="img-bg"></div>
                <img src={hatulso} alt="Brohm Lake"/>
            </figure>
            
            <div className='szoveg'>{obj.valasz}</div>
            <button>Book</button>

            <div className="design-container">
                <span className="design design--1"></span>
                <span className="design design--2"></span>
                <span className="design design--3"></span>
                <span className="design design--4"></span>
                <span className="design design--5"></span>
                <span className="design design--6"></span>
                <span className="design design--7"></span>
                <span className="design design--8"></span>
            </div>
            </div>

        </div>
    </div>
    
    </>
  )
}

