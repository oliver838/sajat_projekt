import React, { useState, useEffect, useContext } from "react";
import { addTopicWithQuestion, updateCard } from "../myBackend";
import { Footer } from "../components/Footer";
import { MyAcces } from "../context/MyContextProvider";

export const CardAdd = ({ cardChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [kerdes, setKerdes] = useState("");
  const [valasz, setValasz] = useState("");

  const { login, hasAcces, card, setCard } = useContext(MyAcces);
  const [barack, setBarcak] = useState(false);

  const handleDropDown = () => {
    setOpen(!open);
  };

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
  };
const UpperAlkitas = (value) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

  useEffect(() => {
    if (!card) return;

    setSelected(card.selected || "");
    setKerdes(card.kerdes || "");
    setValasz(card.valasz || "");
  }, [card]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const item = {
      selected,
      kerdes,
      valasz,
    };

    try {
      if (card) {
        await updateCard(card, item);
        setCard(null);
      } else {
        await addTopicWithQuestion(item);
      }


      setSelected("");
      setKerdes("");
      setValasz("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cardadd">
      <div className="signupSection">
        <div className="info">
          <h2>Mission to Deep Space</h2>
          <i className="icon ion-ios-ionic-outline" aria-hidden="true"></i>
          <p>The Future Is Here</p>
        </div>

        <form onSubmit={handleSubmit} className="signupForm" name="signupform">
          <h2>{card ? "Edit Card" : "Sign Up"}</h2>

          <ul className="noBullet">
            {!card && (
              <li>
                <input
                  type="text"
                  className="inputFields"
                  placeholder="Tipus"
                  value={selected}
                  onChange={(e) => setSelected(UpperAlkitas(e.target.value))}

                  required
                />
              </li>
            )}

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
              <input
                type="submit"
                id="join-btn"
                name="Add"
                alt="Add"
                value={card ? "Update" : "Add"}
              />
            </li>
          </ul>
        </form>
      </div>

      <Footer login={login} add={false} />
    </div>
  );
};
