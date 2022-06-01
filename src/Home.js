import React from "react";

import CreateDeckButton from "./Decks/CreateDeckButton";
import DeckList from "./Decks/DeckList";

function Home() {
  return (
    <div>
      <CreateDeckButton />
      <DeckList />
    </div>
  );
}

export default Home;
