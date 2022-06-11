import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeckName(response.name);
        setDeckDescription(response.description)
      } catch (error) {
        console.error("There was an error", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  const handleNameChange = (event) => {
    setDeckName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDeckDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const deck = {id: deckId, name: deckName, description: deckDescription};
    await updateDeck(deck);
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/"><span className="oi oi-home mr-1"/>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Deck</li>
        </ol>
      </nav>

      <h1>Edit Deck</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={deckName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="textarea"
            id="description"
            className="form-control"
            value={deckDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <button
          className="btn btn-secondary mx-1 my-3"
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mx-1 my-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
