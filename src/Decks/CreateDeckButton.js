import React from "react";
import { useHistory } from "react-router-dom";

function CreateDeckButton() {
  const history = useHistory();

  return (
    <div>
      <button
        type="button"
        className="btn btn-success my-2"
        onClick={() => history.push("/decks/new")}
      >
        <span className="oi oi-plus mr-2" />
        Create Deck
      </button>
    </div>
  );
}

export default CreateDeckButton;
