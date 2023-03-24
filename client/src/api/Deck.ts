export const DECK_URL = "http://localhost:5000/decks";

export async function createDeck(title: string) {
  return await fetch(DECK_URL, {
    method: "POST",
    body: JSON.stringify({
      title: title,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getDecks() {
  return await fetch(DECK_URL);
}

export async function deleteDeck(id: string) {
  return await fetch(`${DECK_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
