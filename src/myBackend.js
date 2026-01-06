
import { collection, doc, setDoc, addDoc, getDoc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "./fireBaseApp";

export const addTopicWithQuestion = async (item) => {
    try{
        const topicName = item.selected
        const kerdes = item.kerdes
        const valasz = item.valasz
        const topicDocRef = doc(db, "topics", topicName);
        const topicDocSnap = await getDoc(topicDocRef);
        if (!topicDocSnap.exists()) {
            await setDoc(topicDocRef, { createdAt: new Date() });
        }
        const questionsCollectionRef = collection(topicDocRef, "questions");
        await addDoc(questionsCollectionRef, {
            kerdes,
            valasz,
        });

        console.log(`Topic és kérdés hozzáadva: ${topicName}`);
            }catch (error) {
            console.error("Hiba a topicok lekérdezésekor:", error);
        }

};
export const updateCard = async (card, item) => {
  try {
    if (!card || !card.id || !card.selected) {
      throw new Error("Card vagy topicName hiányzik!");
    }

    const topicName = card.selected;
    const kerdes = item.kerdes;
    const valasz = item.valasz;

    const questionDocRef = doc(
      db,
      "topics",
      topicName,
      "questions",
      card.id
    );

    await setDoc(
      questionDocRef,
      { kerdes, valasz },
      { merge: true }
    );

    console.log("Kérdés frissítve:", card.id);
  } catch (error) {
    console.error("Hiba a kérdés frissítésekor:", error);
  }
};
export const deleteCard = async (card) => {
  try {
    if (!card || !card.id || !card.selected) {
      throw new Error("Hiányzó card adat a törléshez!");
    }

    const topicName = card.selected;

    const questionDocRef = doc(
      db,
      "topics",
      topicName,
      "questions",
      card.id
    );

    await deleteDoc(questionDocRef);

    console.log("Kártya törölve:", card.id);
  } catch (error) {
    console.error("Hiba a kártya törlésekor:", error);
  }
};

export const getTopic = (setTopics) => {
  try {
    const topicsRef = collection(db, "topics");

    const unsubscribeTopics = onSnapshot(topicsRef, (topicsSnapshot) => {
      const topicsArray = [];
      const unsubscribes = [];

      topicsSnapshot.docs.forEach((topicDoc) => {
        const topicName = topicDoc.id;
        const questionsRef = collection(topicDoc.ref, "questions");

        const unsubscribeQuestions = onSnapshot(questionsRef, (questionsSnap) => {
          const questions = questionsSnap.docs.map((q) => ({
            id: q.id,
            ...q.data(),
          }));

          const index = topicsArray.findIndex(
            (t) => t.topicName === topicName
          );

          if (index !== -1) {
            topicsArray[index].questions = questions;
          } else {
            topicsArray.push({ topicName, questions });
          }

          setTopics([...topicsArray]);
        });

        unsubscribes.push(unsubscribeQuestions);
      });

      return () => {
        unsubscribes.forEach((u) => u());
      };
    });

    return unsubscribeTopics;
  } catch (error) {
    console.error("Hiba a topicok figyelésekor:", error);
  }
};

export const deleteTopicWithQuestions = async (topicName) => {
  try {
    if (!topicName) {
      throw new Error("Topic név hiányzik!");
    }

    const topicRef = doc(db, "topics", topicName);
    const questionsRef = collection(topicRef, "questions");

    const questionsSnap = await getDocs(questionsRef);

    const deletePromises = questionsSnap.docs.map((q) =>
      deleteDoc(q.ref)
    );

    await Promise.all(deletePromises);

    await deleteDoc(topicRef);

    console.log(`Topic teljesen törölve: ${topicName}`);
  } catch (error) {
    console.error("Hiba a topic törlésekor:", error);
  }
};
