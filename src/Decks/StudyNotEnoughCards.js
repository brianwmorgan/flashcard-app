import React from "react";
import { Link } from "react-router-dom";

function StudyNotEnoughCards({ deck, numberOfCards }) {
  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Study</li>
        </ol>
      </nav>

      <h1>Study: {deck.name}</h1>
      <h3>Not enough cards.</h3>
      <div>
        {numberOfCards === 1 ? (
          <p>
            You need at least 3 cards to study. There is 1 card in this deck.
          </p>
        ) : (
          <p>
            You need at least 3 cards to study. There are {numberOfCards} cards
            in this deck.
          </p>
        )}
      </div>
      <Link
        to={`/decks/${deck.id}/cards/new`}
        type="button"
        className="btn btn-primary mx-1"
      >
        Add Cards
      </Link>
    </div>
  );
}

export default StudyNotEnoughCards;
