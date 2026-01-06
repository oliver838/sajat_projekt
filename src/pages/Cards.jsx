import React, { useState, useEffect } from "react";
import { Card } from "../components/card";
import { Footer } from "../components/Footer";
import { deleteCard, deleteTopicWithQuestions, getTopic } from "../myBackend";
import { useContext } from "react";
import { MyAcces } from "../context/MyContextProvider";

export const Cards = () => {
  const {
    topics,
    selectedTopicIndex,
    setSelectedTopicIndex,
    currentIndex,
    setCurrentIndex,
    card,
    setCard,
  } = useContext(MyAcces);

  const selectedQuestions = topics[selectedTopicIndex]?.questions || [];

  const loadCards = (index) => {
    setSelectedTopicIndex(index);
    setCurrentIndex(0);
  };

  const next = () => {
    setCurrentIndex((prev) =>
      prev + 1 < selectedQuestions.length ? prev + 1 : 0
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : selectedQuestions.length - 1
    );
  };

  useEffect(() => {
    setCard(null);
  }, []);
const handleDelete = async () => {
  const currentCard = selectedQuestions[currentIndex];
  const topicName = topics[selectedTopicIndex]?.topicName;

  if (!currentCard || !topicName) return;

  const confirmed = window.confirm("Biztos törlöd ezt a kártyát?");
  if (!confirmed) return;

  // 🔥 HA EZ AZ UTOLSÓ KÉRDÉS
  if (selectedQuestions.length === 1) {
    const confirmTopicDelete = window.confirm(
      `Ez volt az utolsó kártya.\nTöröljük a "${topicName}" topicot is?`
    );

    if (!confirmTopicDelete) return;

    await deleteTopicWithQuestions(topicName);

    setSelectedTopicIndex(0);
    setCurrentIndex(0);
    return;
  }

  // 🔹 normál kártya törlés
  await deleteCard({
    ...currentCard,
    selected: topicName,
  });

  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
};

  const handleDeleteTopic = async () => {
    const topicName = topics[selectedTopicIndex]?.topicName;
    if (!topicName) return;

    const confirmed = window.confirm(
      `Biztos törlöd a "${topicName}" topicot AZ ÖSSZES kártyával együtt?`
    );
    if (!confirmed) return;

    await deleteTopicWithQuestions(topicName);

    setSelectedTopicIndex(0);
    setCurrentIndex(0);
  };

  return (
    <div className="cards">
      {topics && (
        <div className="topic-buttons">
          {topics.map((obj, index) => (
            <button key={index} onClick={() => loadCards(index)}>
              {obj.topicName}
            </button>
          ))}
        </div>
      )}

      <div className="cards-list">
        {selectedQuestions.length > 0 && (
          <>
            <Card
              key={currentIndex}
              obj={{
                ...selectedQuestions[currentIndex],
                selected: topics[selectedTopicIndex].topicName || "",
              }}
              onNext={next}
              onPrev={prev}
            />

            {
              <>
                <p>
                  {currentIndex + 1}/{selectedQuestions.length}
                </p>
                <div className="gombok">
                  <button onClick={prev}>◁</button>
                  <button onClick={next}>▷</button>
                </div>

                <button className="delete-btn" onClick={handleDelete}>
                  🗑 Kártya törlése
                </button>
                <button
                  className="delete-btn"
                  onClick={handleDeleteTopic}
                >
                  🗑 Topic törlése
                </button>
              </>
            }
          </>
        )}
      </div>

      <Footer add={true} />
    </div>
  );
};
