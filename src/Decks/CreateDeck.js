import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { createDeck } from "../utils/api/index";

function CreateDeck() {
  const history = useHistory();

  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleNameChange = (event) => {
    setFormData({
      ...formData,
      name: event.target.value,
    });
  };

  const handleDescriptionChange = (event) => {
    setFormData({
      ...formData,
      description: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDeck = await createDeck(formData);
    history.push(`/decks/${newDeck.id}`);
  };

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      </nav>

      <h1>Create Deck</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Deck Name"
            required
            value={formData.name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="textarea"
            id="description"
            className="form-control"
            placeholder="Brief description of the deck"
            required
            value={formData.description}
            onChange={handleDescriptionChange}
          />
        </div>
        <button
          className="btn btn-secondary mx-1 my-3"
          onClick={() => history.push("/")}
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

export default CreateDeck;
