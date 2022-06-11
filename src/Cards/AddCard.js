import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { readDeck, createCard } from "../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);

  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.error("There was an error", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  const handleFrontChange = (event) => {
    setFormData({
      ...formData,
      front: event.target.value,
    });
  };

  const handleBackChange = (event) => {
    setFormData({
      ...formData,
      back: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, formData);
    setFormData(initialFormState);
  };

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
          <li className="breadcrumb-item active">Add Card</li>
        </ol>
      </nav>

      <h1>{deck.name}: Add Card</h1>

      <CardForm
        deck={deck}
        formData={formData}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
      />

      <button
        className="btn btn-secondary mx-1 my-3"
        onClick={() => history.push(`/decks/${deckId}`)}
      >
        Done
      </button>
      <button
        type="submit"
        className="btn btn-primary mx-1 my-3"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
}

export default AddCard;
