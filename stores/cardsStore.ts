import type { Card } from "~/types/card";
import { cardItems } from "~/data/cardItems.json";

const STORAGE_KEY = "cardsStore.cards";

// A wrapper for localStorage to handle errors and browsers without it
const storage = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem(key);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    return null;
  },
  setItem(key: string, value: string): void {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  },
};

function loadCards(): Card[] {
  console.log("Loading cards...");
  const stored = storage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      const parsedCards = JSON.parse(stored);
      console.log("Loaded cards from localStorage:", parsedCards.length);
      return parsedCards;
    } catch (error) {
      console.error("Failed to parse stored cards:", error);
    }
  } else {
    console.log("No cards found in localStorage, using default data");
  }

  // Fallback to initial data
  return [...cardItems];
}

export const useCardsStore = defineStore("cardsStore", () => {
  const isClient = ref(false);
  const isInitialized = ref(false);
  const cards = ref<Card[]>([...cardItems]);

  onMounted(() => {
    isClient.value = true;
    cards.value = loadCards();
    isInitialized.value = true;
  });

  // Persist cards to localStorage whenever they change, but only on client side
  watch(
    cards,
    (newCards) => {
      if (isClient.value) {
        console.log("Saving cards to localStorage:", newCards.length);
        storage.setItem(STORAGE_KEY, JSON.stringify(newCards));
      }
    },
    { deep: true },
  );

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
    isInitialized,
    addCard,
    updateCard,
    removeCard,
  };
});
