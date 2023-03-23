import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeckModel from "./models/Deck";
require("dotenv").config();

const PORT = 5000;
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new DeckModel({
    // creates a model
    title: req.body.title,
  });
  const createdDeck = await newDeck.save(); // inserts a new document
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
  console.log(`Now listening at port ${PORT}`);
  app.listen(PORT);
});
