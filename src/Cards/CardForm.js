import React from "react";

function CardForm({ formData, handleFrontChange, handleBackChange }) {
  return (
    <div>
      <form>
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
      </form>
    </div>
  );
}

export default CardForm;
