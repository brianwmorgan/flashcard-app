import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

function ViewDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        setCards(deckResponse.cards);
      } catch (error) {
        console.error("There was an error", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  const handleDeleteDeck = async (event) => {
    if (
      window.confirm(`Delete this deck? You will not be able to recover it.`)
    ) {
      await deleteDeck(event);
      history.push("/");
    }
  };

  const handleDeleteCard = async (event) => {
    if (
      window.confirm(`Delete this card? You will not be able to recover it.`)
    ) {
      await deleteCard(event);
      history.go(0);
    }
  };

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">{deck.name}</li>
        </ol>
      </nav>

      <div className="card border-0 my-3">
        <div className="card-body">
          <h2 className="card-title">{deck.name}</h2>
          <p>{deck.description}</p>
          <Link
            to={`/decks/${deckId}/edit`}
            type="button"
            className="btn btn-secondary mx-1"
          >
            Edit
          </Link>
          <Link
            to={`/decks/${deckId}/study`}
            type="button"
            className="btn btn-primary mx-1"
          >
            Study
          </Link>
          <Link
            to={`/decks/${deckId}/cards/new`}
            type="button"
            className="btn btn-primary mx-1"
          >
            Add Cards
          </Link>
          <button
            type="button"
            className="btn btn-danger mx-1 float-right"
            onClick={() => handleDeleteDeck(deck.id)}
          >
            Delete
          </button>
        </div>
      </div>

      <h2>Cards</h2>

      {cards.map((card) => {
        return (
          <div className="card-deck" key={card.id}>
            <div className="card my-1">
              <div className="row">
                <div className="col mx-3 my-2">{card.front}</div>
                <div className="col mx-3 my-2">{card.back}</div>
                <div className="container">
                  <button
                    type="button"
                    className="btn btn-danger mx-2 my-2 float-right"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary mx-1 my-2 float-right"
                    onClick={() =>
                      history.push(`/decks/${deck.id}/cards/${card.id}/edit`)
                    }
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ViewDeck;
