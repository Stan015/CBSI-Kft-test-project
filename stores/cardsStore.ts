import type { Card } from "~/types/card";
import { cardItems } from "~/data/cardItems.json";

export const useCardsStore = defineStore("cardsStore", () => {
  const cards = ref<Card[]>([...cardItems]);

  // add a new card (generates its own id)
  const addCard = (payload: Omit<Card, "id">) => {
    const nextId = cards.value.length
      ? Math.max(...cards.value.map((c) => c.id)) + 1
      : 1;
    cards.value.unshift({ id: nextId, ...payload });
  };

  // update an existing card by id
  const updateCard = (id: number, changes: Partial<Card>) => {
    const idx = cards.value.findIndex((c) => c.id === id);
    if (idx !== -1) {
      cards.value[idx] = { ...cards.value[idx], ...changes };
    }
  };

  // remove a card
  const removeCard = (id: number) => {
    cards.value = cards.value.filter((c) => c.id !== id);
  };

  return {
    cards,
    addCard,
    updateCard,
    removeCard,
  };
});
