
import { collection, doc, setDoc, addDoc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
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
export const getTopic = (setTopics) => {
  try {
    const topicsRef = collection(db, "topics");

    const unsubscribe = onSnapshot(topicsRef, async (topicsSnapshot) => {
      if (topicsSnapshot.empty) {
        setTopics([]);
        return;
      }

      const topicsArray = [];

      for (const topicDoc of topicsSnapshot.docs) {
        const topicName = topicDoc.id;

        const questionsRef = collection(topicDoc.ref, "questions");

        const questionsSnapshot = await new Promise((resolve) =>
          onSnapshot(questionsRef, resolve)
        );

        const questions = questionsSnapshot.docs.map((q) => ({
          id: q.id,
          ...q.data(),
        }));

        topicsArray.push({ topicName, questions });
      }

      setTopics(topicsArray);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Hiba a topicok figyelésekor:", error);
  }
};

