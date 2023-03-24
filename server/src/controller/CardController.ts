import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export async function createCardController(req: Request, res: Response) {
  console.log(req.params.deckId);
  const deck = await DeckModel.findById(req.params.deckId);
  if (!deck) return res.status(400).send("no deck of such id exists");
  deck.cards.push(req.body.text);
  await deck.save();
  res.json(deck);
}
