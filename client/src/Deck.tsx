import { useEffect, useState } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import { createCard, deleteCard, getCards } from "./api/Card";

function Deck() {
  const [text, setText] = useState("");
  const [cards, setCards] = useState<string[]>([]);
  let { deckId } = useParams();

  function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();
    createCard(deckId!, text)
      .then(async (res) => {
        setText("");
        const newCards = await res.json();
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDeleteCard(index: number) {
    deleteCard(deckId!, index)
      .then(async (res) => {
        setCards(await res.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCards(deckId!).then(async (res) => {
      setCards(await res.json());
    });
  }, [deckId]);

  return (
    <div className="container">
      <div className="App">
        <h1>Cards</h1>
        <ul className="cards">
          {cards.map((card, index) => (
            <li key={index}>
              <button onClick={() => handleDeleteCard(index)}>X</button>
              {card}
            </li>
          ))}
        </ul>
        <form>
          <label htmlFor="card-text">Card Text</label>
          <input
            id="card-text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
            }}
          />
          <button onClick={handleCreateCard}>Create Card</button>
        </form>
      </div>
    </div>
  );
}

export default Deck;
