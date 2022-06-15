import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { readDeck } from "../utils/api/index";
import StudyEnoughCards from "./StudyEnoughCards";
import StudyNotEnoughCards from "./StudyNotEnoughCards";

function StudyDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [numberOfCards, setNumberOfCards] = useState(0);

  // load deck data
  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        setNumberOfCards(deckResponse.cards.length);
      } catch (error) {
        console.error("There was an error", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  // if the deck has two or more cards, render the StudyEnoughCards component
  // if not, render the StudyNotEnoughCards component
  if (numberOfCards > 2) {
    return (
      <div>
        <StudyEnoughCards deck={deck} numberOfCards={numberOfCards} />
      </div>
    );
  } else {
    return (
      <div>
        <StudyNotEnoughCards deck={deck} numberOfCards={numberOfCards} />
      </div>
    );
  }
}

export default StudyDeck;
