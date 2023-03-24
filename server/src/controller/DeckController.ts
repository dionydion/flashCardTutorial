import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export async function createDeckController(req: Request, res: Response) {
  console.log(req.body);
  const newDeck = new DeckModel({
    // creates a model
    title: req.body.title,
  });
  const createdDeck = await newDeck.save(); // inserts a new document
  res.json(createdDeck);
}

export async function getDeckController(req: Request, res: Response) {
  const decks = await DeckModel.find();
  res.json(decks);
}

export function deleteDeckController(req: Request, res: Response) {
  console.log(req.params);
  DeckModel.findOneAndDelete({ _id: req.params.deckId }).then((deck) => {
    res.json(deck);
  });
}
