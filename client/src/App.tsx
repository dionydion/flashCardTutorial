import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createDeck, deleteDeck, getDecks } from "./api/Deck";
import { Link } from "react-router-dom";
import { TDeck } from "./models/TDeck";

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    createDeck(title)
      .then(async (res) => {
        setTitle("");
        const deck = await res.json();
        setDecks([...decks, deck]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDeleteDeck(id: string) {
    deleteDeck(id)
      .then((res) => {
        setDecks(decks.filter((deck) => deck._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getDecks().then(async (res) => {
      setDecks(await res.json());
    });
  }, []);

  return (
    <div className="container">
      <div className="App">
        <h1>Your Decks</h1>
        <ul className="decks">
          {decks.map((deck) => (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
              <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
            </li>
          ))}
        </ul>
        <form>
          <label htmlFor="deck-title">Deck Title</label>
          <input
            id="deck-title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <button onClick={handleCreateDeck}>Create Deck</button>
        </form>
      </div>
    </div>
  );
}

export default App;
