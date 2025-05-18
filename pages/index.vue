<script setup lang="ts">
useSeoMeta({
  title: "Notes App",
  description: "A simple notes app built with Vue 3, Nuxt 3 and Tailwind CSS",
});

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

      <div class="flex items-center gap-3">
        <FilterSelect
          v-model:selectedOptions="selectedTypes"
          :options="[
            { value: 'default-card-style', label: 'Default Card Style' },
            { value: 'image-card-style', label: 'Image Card Style' },
            { value: 'checkbox-card-style', label: 'Checkbox Card Style' },
          ]"
          class="flex flex-col items-center"
          trigger-class="bg-black rounded-full w-[5.5rem] p-2 px-4 text-white h-10"
          dropdown-class="w-[10rem]"
          checkbox-class="w-5 h-5"
          option-class="text-sm"
        />

        <AddNewCardBtn />
      </div>
    </section>

    <section class="px-[5%] w-full">
      <div
        v-if="store.isInitialized"
        class="grid grid-cols-4 max-xl:grid-cols-3 max-[820px]:!grid-cols-2 max-sm:!grid-cols-1 gap-4"
      >
        <Card
          v-for="card in filteredCards"
          :key="card.id"
          :card="card"
          :selectedTypes="selectedTypes"
        />
      </div>
      <div
        v-else
        class="grid grid-cols-4 max-xl:grid-cols-3 max-[820px]:!grid-cols-2 max-sm:!grid-cols-1 gap-4"
      >
        <CardSkeleton v-for="n in 12" :key="n" />
      </div>
    </section>
  </main>
</template>
