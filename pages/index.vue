<script setup lang="ts">
import type { Card } from "~/types/card";

const selectedTypes = ref<string[]>([]);

const store = useCardsStore();

// Ensure each card has a selectedOptions property (for checkbox-card-style)
store.cards.forEach((card: Card) => {
  if (
    card.cardStyle === "checkbox-card-style" &&
    !("selectedOptions" in card)
  ) {
    card.selectedOptions = [];
  }
});

// Filtered cards based on selectedTypes
const filteredCards = computed(() => {
  // show all cards
  if (selectedTypes.value.length === 0 || selectedTypes.value.includes("all")) {
    return store.cards;
  }
  // Otherwise, filter by cardStyle
  return store.cards.filter((card: Card) =>
    selectedTypes.value.includes(card.cardStyle),
  );
});
</script>

<template>
  <main>
    <section class="flex gap-4 justify-between items-center my-4 px-[5%]">
      <h1 class="font-bold text-3xl">Notes</h1>

      <div class="flex items-center gap-3 mb-4">
        <FilterSelect
          v-model:selectedOptions="selectedTypes"
          :options="[
            { value: 'default-card-style', label: 'Default Card Style' },
            { value: 'image-card-style', label: 'Image Card Style' },
            { value: 'checkbox-card-style', label: 'Checkbox Card Style' },
          ]"
          class="flex flex-col items-center"
          trigger-class="bg-black rounded-full w-[5rem] p-2 text-white h-10"
          dropdown-class="w-[10rem]"
          checkbox-class="w-5 h-5"
          option-class="text-sm"
        />

        <AddNewCardBtn />
      </div>
    </section>

    <section class="grid grid-cols-4 gap-4 px-[5%]">
      <Card
        v-for="card in filteredCards"
        :key="card.id"
        :card="card"
        :selectedTypes="selectedTypes"
      />
    </section>
  </main>
</template>
