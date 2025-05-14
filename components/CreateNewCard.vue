<script lang="ts" setup>
const selectedCardStyle = ref<string>("Default Card Style");

const cardTypeOptions = [
  "Default Card Style",
  "Image Card Style",
  "Checkbox Card Style",
];

const handleUpload = (file: File) => {
  console.log("Selected file:", file);
};

const CheckOptionsForCheckType = ref<string[]>([]);
</script>

<template>
  <form class="bg-white shadow-lg rounded-2xl p-6 w-[25rem]" @submit.prevent>
    <div class="flex items-center justify-between mb-4">
      <h2>Create New Card</h2>

      <button
        aria-label="Close"
        class="cursor-pointer border border-transparent hover:border-accent p-2 rounded-full transition-all"
        type="button"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
      <Select v-model="selectedCardStyle" placeholder="Select an option">
        <template #options="{ selectOption, selected }">
          <div
            v-for="option in cardTypeOptions"
            :key="option"
            class="px-3 py-2 text-primary cursor-pointer hover:bg-blue-light transition-all"
            :class="cn({ 'bg-blue-light': selected === option })"
            role="option"
            :aria-selected="selected === option"
            @click="selectOption(option)"
          >
            {{ option }}
          </div>
        </template>
      </Select>

      <Input type="text" placeholder="Header" />

      <ImageUploader
        v-if="selectedCardStyle === 'Image Card Style'"
        @file-selected="handleUpload"
      />

      <TextArea placeholder="Description" />

      <OptionList
        v-if="selectedCardStyle === 'Checkbox Card Style'"
        v-model="CheckOptionsForCheckType"
      />

      <Button
        class="bg-blue text-white rounded-4xl cursor-pointer px-4 py-2"
        type="submit"
      >
        Create
      </Button>
    </div>
  </form>
</template>
