export const DECK_URL = "http://localhost:5000/decks";

export async function createCard(id: string, text: string) {
  return await fetch(`${DECK_URL}/${id}/cards`, {
    method: "POST",
    body: JSON.stringify({
      text: text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getCards(id: string) {
  return await fetch(`${DECK_URL}/${id}/cards`);
}

export async function deleteCard(deckId: string, cardId: number) {
  return await fetch(`${DECK_URL}/${deckId}/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
