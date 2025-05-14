<script setup lang="ts">
import type { Card } from "~/types/card";

const selectedTypes = ref([]);

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
      <NuxtLink
        v-for="card in store.cards"
        :key="card.id"
        :to="`/${card.id}`"
        class="bg-white shadow-lg rounded-2xl p-6 w-full max-h-[28rem] hover:shadow-xl transition-all duration-300 hover:transform hover:scale-102"
      >
        <h2 class="text-lg font-bold mb-4">{{ card.title }}</h2>
        <img
          v-if="card.imageSrc"
          :src="card.imageSrc"
          :alt="card.title"
          class="w-full h-50 object-cover rounded-2xl mb-4"
        />
        <p
          :class="
            cn('text-primary mb-4 overflow-hidden', {
              'line-clamp-5': card.imageSrc !== null,
              'h-[90%]':
                !card.imageSrc && card.cardStyle === 'default-card-style',
              'line-clamp-7 ':
                !card.imageSrc && card.cardStyle === 'checkbox-card-style',
            })
          "
        >
          {{ card.description }}
        </p>

        <div
          v-if="card.cardStyle === 'checkbox-card-style'"
          class="flex flex-col gap-2 overflow-y-scroll"
          @click.stop
        >
          <div
            v-for="(option, index) in card.options"
            :key="index"
            class="flex items-center gap-2"
            @click.stop
          >
            <input
              type="checkbox"
              :id="'option-' + card.id + '-' + index"
              :value="option"
              v-model="card.selectedOptions"
              class="shrink-0 cursor-pointer w-6 h-6 border-2"
              @click.stop
            />
            <label
              :for="'option-' + card.id + '-' + index"
              class="cursor-pointer"
              @click.stop
            >
              {{ option }}
            </label>
          </div>
        </div>
      </NuxtLink>
    </section>
  </main>
</template>
