import { createContext, useEffect, useState } from "react";
import { getTopic } from "../myBackend";
import axios from "axios";

export const MyAcces = createContext();
export const MyContextProvider = ({ children }) => {


  const [hasAcces, setHasAcces] = useState(false);
  const [loading,setLoading] = useState(true)
  const [checker, setChecker] = useState(false)
  const [topics, setTopics] = useState([]);
  const [card, setCard] = useState(() => {
  const saved = localStorage.getItem("card");
  return saved ? JSON.parse(saved) : null;
});
useEffect(() => {
  if (card !== null) {
    localStorage.setItem("card", JSON.stringify(card));
  }
}, [card]);

  const [selectedTopicIndex, setSelectedTopicIndex] = useState(
    () => Number(localStorage.getItem("selectedTopicIndex")) || 0
  );
  const [currentIndex, setCurrentIndex] = useState(
    () => Number(localStorage.getItem("currentIndex")) || 0
  );

  useEffect(() => {

    const unsubscribe = getTopic(setTopics);
    return () => unsubscribe && unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = getTopic(setTopics);
    return () => unsubscribe && unsubscribe();
  }, [checker]);
  useEffect(()=>{
    const checkAuth = async ()=>{
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/protected`,{withCredentials:true})
            setHasAcces(true)

        } catch (error) {
            console.log(error)
            setHasAcces(false) 
        }finally{
            setLoading(false)
        }
    }
    
    checkAuth()
  },[])
  const verifyKey = async (key) =>{
    
    
    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/login`,{key},{withCredentials:true})
        setHasAcces(true)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
  }

  const clearKey =async ()=>{
    await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/logout`,{},{withCredentials:true});
    setHasAcces(false)
  }

  useEffect(() => {
    localStorage.setItem("selectedTopicIndex", selectedTopicIndex);
    localStorage.setItem("currentIndex", currentIndex);
  }, [selectedTopicIndex, currentIndex]);

  return (
    <MyAcces.Provider
      value={{
        hasAcces,
        setHasAcces,
        topics,
        setTopics,
        checker,
        card,
        setCard,
        setChecker,
        verifyKey,
        clearKey,
        selectedTopicIndex,
        setSelectedTopicIndex,
        currentIndex,
        setCurrentIndex,
      }}
    >
      {children}
    </MyAcces.Provider>
  );
};
