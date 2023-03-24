import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeckModel from "./models/Deck";
import cors from "cors";
require("dotenv").config();

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await DeckModel.find();
  res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
  console.log(req.body);
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
