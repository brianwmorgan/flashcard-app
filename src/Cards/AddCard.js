import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { readDeck, createCard } from "../utils/api/index";

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);

  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

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
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Add Card</li>
        </ol>
      </nav>

      <h1>{deck.name}: Add Card</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="front">Front</label>
          <textarea
            type="textarea"
            id="front"
            className="form-control"
            placeholder="Front side of card"
            value={formData.front}
            onChange={handleFrontChange}
          />
        </div>
        <div>
          <label htmlFor="back">Back</label>
          <textarea
            type="textarea"
            id="back"
            className="form-control"
            placeholder="Back side of card"
            value={formData.back}
            onChange={handleBackChange}
          />
        </div>
        <button
          className="btn btn-secondary mx-1 my-3"
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Done
        </button>
        <button type="submit" className="btn btn-primary mx-1 my-3">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
