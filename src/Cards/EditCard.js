import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { readDeck, readCard, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  // load deck and card data
  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        const cardResponse = await readCard(cardId, abortController.signal);
        setCard(cardResponse);
      } catch (error) {
        console.error("There was an error", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId, cardId]);

  // change handler for 'Front' form field
  const handleFrontChange = (event) => {
    setCard({
      ...card,
      front: event.target.value,
    });
  };

  // change handler for 'Back' form field
  const handleBackChange = (event) => {
    setCard({
      ...card,
      back: event.target.value,
    });
  };

  // submit handler for 'Edit Card' form
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deckId}`);
  };

  // return the nav bar and header, and render the CardForm component
  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/"><span className="oi oi-home mr-1"/>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Card</li>
        </ol>
      </nav>

      <h1>Edit Card</h1>

      <CardForm
        formData={card}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
      />

      <button
        className="btn btn-secondary mx-1 my-3"
        onClick={() => history.push(`/decks/${deckId}`)}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="btn btn-primary mx-1 my-3"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default EditCard;
