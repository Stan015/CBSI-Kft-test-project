<script setup lang="ts">
const props = defineProps<{
  cardId: number;
}>();
const emit = defineEmits(["deleted"]);

const showModal = ref(false);

const handleDelete = () => {
  emit("deleted", props.cardId);
  showModal.value = false;
};
</script>

<template>
  <div class="inline-block">
    <Button
      class="bg-red hover:bg-red/95 transition-all text-white hover:scale-95"
      @click="showModal = true"
    >
      Delete Note
    </Button>
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="showModal = false"
    >
      <div
        class="bg-white rounded-xl shadow-lg p-6 w-[22rem] max-sm:w-[20rem] flex flex-col items-center"
      >
        <h3 class="text-xl font-bold mb-2 text-red">Delete Note?</h3>
        <p class="mb-6 text-center text-gray-700">
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>
        <div class="flex gap-4">
          <Button
            class="bg-gray text-black px-4 py-1 rounded-full hover:bg-gray/95 hover:scale-95 transition-all"
            @click="showModal = false"
          >
            Cancel
          </Button>
          <Button
            class="bg-red text-white px-4 py-1 rounded-full hover:bg-red/95 hover:scale-95 transition-all"
            @click="handleDelete"
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
