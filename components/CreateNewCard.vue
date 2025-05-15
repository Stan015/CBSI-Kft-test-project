<script lang="ts" setup>
import type { Card } from "~/types/card";

const emit = defineEmits(["close"]);

const store = useCardsStore();

const selectedCardStyle = ref("default-card-style");
const cardTypeOptions = [
  { value: "default-card-style", label: "Default Card Style" },
  { value: "image-card-style", label: "Image Card Style" },
  { value: "checkbox-card-style", label: "Checkbox Card Style" },
];

const header = ref("");
const description = ref("");
const imageSrc = ref<string | null>(null);
const checkOptions = ref<string[]>([]);

// Handle image upload (for image-card-style)
const handleUpload = (file: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    imageSrc.value = reader.result as string;
  };
  reader.readAsDataURL(file);
};

// Handle form submit
const handleCreate = () => {
  // Build card payload based on type
  const payload: Omit<Card, "id"> = {
    cardStyle: selectedCardStyle.value,
    title: header.value,
    description: description.value,
    imageSrc: null,
    options: [],
    selectedOptions: [],
  };

  if (selectedCardStyle.value === "image-card-style") {
    payload.imageSrc = imageSrc.value;
  }
  if (selectedCardStyle.value === "checkbox-card-style") {
    payload.options = [...checkOptions.value];
    payload.selectedOptions = [];
  }

  // Add new card to store
  store.addCard(payload);

  // Reset form fields anc close modal
  emit("close");
};
</script>

<template>
  <form
    class="bg-white shadow-lg rounded-2xl p-6 w-[25rem]"
    @submit.prevent="handleCreate"
  >
    <div class="flex items-center justify-between mb-4">
      <h2>Create New Card</h2>
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
      <Select v-model="selectedCardStyle" placeholder="Select type of card">
        <template #options="{ selectOption, selected }">
          <div
            v-for="option in cardTypeOptions"
            :key="option.value"
            class="px-3 py-2 text-primary cursor-pointer hover:bg-blue-light transition-all"
            :class="{ 'bg-blue-light': selected === option.value }"
            role="option"
            :aria-selected="selected === option.label"
            @click="selectOption(option.value)"
          >
            {{ option.label }}
          </div>
        </template>
      </Select>

      <Input v-model="header" type="text" placeholder="Header" />

      <ImageUploader
        v-if="selectedCardStyle === 'image-card-style'"
        @file-selected="handleUpload"
      />

      <TextArea v-model="description" placeholder="Description" />

      <OptionList
        v-if="selectedCardStyle === 'checkbox-card-style'"
        v-model="checkOptions"
      />

      <Button
        :class="
          cn('bg-blue text-white rounded-4xl cursor-pointer px-4 py-2', {
            'bg-gray cursor-not-allowed':
              (selectedCardStyle === 'default-card-style' &&
                (!header || !description)) ||
              (selectedCardStyle === 'image-card-style' &&
                (!header || !description || !imageSrc)) ||
              (selectedCardStyle === 'checkbox-card-style' &&
                (!header || !description || !checkOptions.length)),
          })
        "
        type="submit"
        :disabled="
          (selectedCardStyle === 'default-card-style' &&
            (!header || !description)) ||
          (selectedCardStyle === 'image-card-style' &&
            (!header || !description || !imageSrc)) ||
          (selectedCardStyle === 'checkbox-card-style' &&
            (!header || !description || !checkOptions.length))
        "
      >
        Create
      </Button>
    </div>
  </form>
</template>
