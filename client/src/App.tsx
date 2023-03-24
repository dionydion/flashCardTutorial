import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

type TDeck = {
  title: string;
  _id: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({
        title: title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
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
    fetch(`http://localhost:5000/decks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    setDecks(decks.filter((deck) => deck._id !== id));
  }

  useEffect(() => {
    fetch("http://localhost:5000/decks").then(async (res) => {
      setDecks(await res.json());
    });
  }, []);

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            {deck.title}
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
  );
}

export default App;
