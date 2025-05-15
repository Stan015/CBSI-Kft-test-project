<script setup lang="ts">
import type { Card } from "~/types/card";

const props = defineProps<{ card: Card }>();
const emit = defineEmits(["close", "update"]);

const store = useCardsStore();

const selectedCardStyle = ref(props.card.cardStyle);
const header = ref(props.card.title);
const description = ref(props.card.description);
const imageSrc = ref<string | null>(props.card.imageSrc ?? null);
const checkOptions = ref<string[]>(
  props.card.options ? [...props.card.options] : [],
);

const handleUpload = (file: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    imageSrc.value = reader.result as string;
  };
  reader.readAsDataURL(file);
};

const handleUpdate = () => {
  const updated: Partial<Card> = {
    cardStyle: selectedCardStyle.value,
    title: header.value,
    description: description.value,
    imageSrc:
      selectedCardStyle.value === "image-card-style" ? imageSrc.value : null,
    options:
      selectedCardStyle.value === "checkbox-card-style"
        ? [...checkOptions.value]
        : [],
  };
  store.updateCard(props.card.id, updated);
  emit("close");
};
</script>

<template>
  <form
    class="bg-white shadow-lg rounded-2xl p-6 w-[25rem] max-sm:w-[22rem]"
    @submit.prevent="handleUpdate"
  >
    <div class="flex items-center justify-between mb-4">
      <h2>Edit Card</h2>
      <button
        aria-label="Close"
        class="cursor-pointer border border-transparent hover:border-accent p-2 rounded-full transition-all"
        type="button"
        @click="$emit('close')"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M1 17L17 1M17 17L1 1"
            stroke="#0A0C11"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div class="flex flex-col gap-4">
      <Select v-model="selectedCardStyle" disabled>
        <template #options>
          <div>{{ selectedCardStyle }}</div>
        </template>
      </Select>
      <Input v-model="header" type="text" placeholder="Header" />
      <ImageUploader
        v-if="selectedCardStyle === 'image-card-style'"
        @file-selected="handleUpload"
        :initial-src="imageSrc"
      />
      <TextArea v-model="description" placeholder="Description" :rows="6" />
      <OptionList
        v-if="selectedCardStyle === 'checkbox-card-style'"
        v-model="checkOptions"
      />
      <Button
        class="bg-blue text-white rounded-4xl cursor-pointer px-4 py-2"
        type="submit"
      >
        Update
      </Button>
    </div>
  </form>
</template>
