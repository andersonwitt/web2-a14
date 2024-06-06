import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useState } from "react";
import UsedCardList from "@/components/UsedCardList";
import CardPreview from "@/components/CardPreview";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState(null);

  async function handleDrawCard() {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
    );
    const currentCards = cards.concat(response.data.cards);
    setCard(response.data.cards[0]);
    setCards(currentCards);
  }

  async function handleNewDeck() {
    const response = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    setCards([]);
    setCard(null);
    setDeck(response.data);
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-5 p-24 ${inter.className}`}
    >
      <button onClick={handleNewDeck}>Gerar novo baralho</button>
      <button onClick={handleDrawCard}>Comprar uma carta</button>
      <CardPreview card={card} />
      <UsedCardList cards={cards} />
    </main>
  );
}
