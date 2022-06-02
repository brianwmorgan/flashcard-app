import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { listDecks, deleteDeck } from "../utils/api/index";

function DeckList() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await listDecks(abortController.signal);
        setDecks(deckResponse);
      } catch (error) {
        console.error("There was an error", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, []);

  const handleDelete = async (event) => {
    if (
      window.confirm(`Delete this deck? You will not be able to recover it.`)
    ) {
      await deleteDeck(event);
      history.go(0);
    }
  };

  const deckList = decks.map((deck) => {
    return (
      <div className="card my-1" key={deck.id}>
        <div className="card-body">
          <div className="card-title">
            <h3>{`${deck.name}`}</h3>
          </div>
          <div className="card-subtitle">
            {deck.cards.length === 1 ? (
              <h6>{`${deck.cards.length} card`}</h6>
            ) : (
              <h6>{`${deck.cards.length} cards`}</h6>
            )}
          </div>
          <div className="card-text">{`${deck.description}`}</div>
          <button
            type="button"
            className="btn btn-secondary mx-1 mt-3"
            onClick={() => history.push(`/decks/${deck.id}`)}
          >
            View
          </button>
          <button
            type="button"
            className="btn btn-primary mx-1 mt-3"
            onClick={() => history.push(`/decks/${deck.id}/study`)}
          >
            Study
          </button>
          <button
            type="button"
            className="btn btn-danger mx-1 mt-3 float-right"
            onClick={() => handleDelete(deck.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return <div>{deckList}</div>;
}

export default DeckList;
