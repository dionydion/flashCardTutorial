import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeckModel from "./models/Deck";
import cors from "cors";
import {
  createDeckController,
  deleteDeckController,
  getDeckController,
} from "./controller/DeckController";
import {
  createCardController,
  deleteCardController,
  getCardController,
} from "./controller/CardController";
require("dotenv").config();

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/decks", getDeckController);

app.post("/decks", createDeckController);

app.delete("/decks/:deckId", deleteDeckController);

app.post("/decks/:deckId/cards", createCardController);

app.get("/decks/:deckId/cards", getCardController);

app.delete("/decks/:deckId/:cardId", deleteCardController);

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
  console.log(`Now listening at port ${PORT}`);
  app.listen(PORT);
});
