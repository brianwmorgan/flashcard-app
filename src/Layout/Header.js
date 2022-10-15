import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="jumbotron bg-transparent">
      <div className="container text-black">
        <h1 className="display-4">Flip and Flourish</h1>
        <p className="lead font-italic ml-1">Build your own flashcard decks to master new material.</p>
      </div>
    </header>
  );
}

export default Header;
