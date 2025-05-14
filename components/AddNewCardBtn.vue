<script setup lang="ts">
const store = useCardsStore();

const showModal = ref(false);
const selectedCardStyle = ref("default-card-style");
const selectedTypes = ref([]);

const currentCardId = ref<number | null>(null);

const handleUpload = (file: File) => {
  console.log("Selected file:", file);

  const reader = new FileReader();
  reader.onload = () => {
    store.updateCard(currentCardId.value!, {
      imageSrc: reader.result as string,
    });
  };
  reader.readAsDataURL(file);

  showModal.value = false;
};
</script>

<template>
  <div class="flex flex-shrink-0">
    <Button
      type="button"
      @click="showModal = true"
      class="flex items-center flex-shrink-0 justify-center gap-1 hover:bg-blue/95 transition-all hover:border-blue focus:border-blue active:border-blue focus:outline-none focus:ring-3 focus:ring-blue-light"
    >
      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.75 7H1.75M6.75 2V12"
          stroke="currentColor"
          stroke-width="2.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Add Card
    </Button>

    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
      @click.self="showModal = false"
    >
      <CreateNewCard
        :cardStyle="selectedCardStyle"
        :selectedTypes="selectedTypes"
        @close="showModal = false"
        @upload="handleUpload"
      />
    </div>
  </div>
</template>
