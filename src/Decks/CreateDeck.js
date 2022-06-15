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

  // change handler for 'Name' form field
  const handleNameChange = (event) => {
    setFormData({
      ...formData,
      name: event.target.value,
    });
  };

  // change handler for 'Description' form field
  const handleDescriptionChange = (event) => {
    setFormData({
      ...formData,
      description: event.target.value,
    });
  };

  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDeck = await createDeck(formData);
    history.push(`/decks/${newDeck.id}`);
  };

  // return the nav bar, header, and 'Create Deck' form
  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home mr-1"></span>Home
            </Link>
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
