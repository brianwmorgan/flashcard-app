import React from "react";

import CreateDeckButton from "./Decks/CreateDeckButton";
import DeckList from "./Decks/DeckList";

function Home() {
  
  // present user with a 'Create Deck' button and the full list of decks on the Home screen

  return (
    <div>
      <CreateDeckButton />
      <DeckList />
    </div>
  );
}

export default Home;
