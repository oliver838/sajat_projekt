import React, { useState, useEffect } from "react";
import { Card } from "../components/card";
import { Footer } from "../components/Footer";
import { getTopic } from "../myBackend";
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
              </>
            }
          </>
        )}
      </div>

      <Footer add={true} />
    </div>
  );
};
