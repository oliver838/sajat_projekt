import React, { useState } from 'react';
import { addTopicWithQuestion } from '../myBackend';
import { Footer } from '../components/Footer';

export const CardAdd = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
const [kerdes, setKerdes] = useState("")
const [valasz,setValasz] = useState("")

  const [barack,setBarcak] = useState(false);
  const handleDropDown = () => {
    setOpen(!open);
  };

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();  // Ne frissítse újra az oldalt a form beküldése után!
    
    const item = { selected, kerdes, valasz };

    
    // Küldd el a backendnek
    await addTopicWithQuestion(item);

    // Üresre állítjuk az inputokat a sikeres submit után (opcionális)
    setSelected("")
    setKerdes("");
    setValasz("");
  };
  return (
    <div className='cardadd'>
      <div className="signupSection">
        <div className="info">
            <h2>Mission to Deep Space</h2>
            <i className="icon ion-ios-ionic-outline" aria-hidden="true"></i>
            <p>The Future Is Here</p>
        </div>

        <form onSubmit={handleSubmit} className="signupForm" name="signupform">
            <h2>Sign Up</h2>
            <ul className="noBullet">

                {/* DROPDOWN */}
                <li >
                  {/* <div id="menu-container" className={open ? "open" : ""}>
                    
                    <div id="menu-main" onClick={handleDropDown}>
                      <span id="menu-title">{selected}</span>
                      <span className="arrow">{open ? "▲" : "▼"}</span>
                    </div>

                    <div id="menu-dropdown">
                        <button type="button" className="drop-btn" onClick={() => handleSelect("Github")}>Github</button>
                        <button type="button" className="drop-btn" onClick={() => handleSelect("Java")}>Java</button>
                        <button type="button" className="drop-btn" onClick={() => handleSelect("Python")}>Python</button>
                    </div>

                  </div> */}
                  
                      <input
                        type="text"
                        className="inputFields"
                        placeholder="Tipus"
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                        required
                    />
                </li>

               <li>
                    <input
                        type="text"
                        className="inputFields"
                        placeholder="Kérdés"
                        value={kerdes}
                        onChange={(e) => setKerdes(e.target.value)}
                        required
                    />
                    </li>

                    <li>
                    <textarea
                        className="inputFields textareaField"
                        placeholder="Válasz"
                        value={valasz}
                        onChange={(e) => setValasz(e.target.value)}
                        required
                    ></textarea>
                    </li>

                <li id="center-btn">
                  <input type="submit" id="join-btn" name="Add" alt="Add" value="Add"/>
                </li>

            </ul>
        </form>
      </div>
      <Footer login={login} add={false}/>
    </div>
  );
};
