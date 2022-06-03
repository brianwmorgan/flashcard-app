import React from "react";
import { useHistory } from "react-router-dom";

function CreateDeckButton() {
  const history = useHistory();

  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary my-2"
        onClick={() => history.push("/decks/new")}
      >
        Create Deck
      </button>
    </div>
  );
}

export default CreateDeckButton;
