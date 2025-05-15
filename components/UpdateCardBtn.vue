<script setup lang="ts">
import type { Card } from "~/types/card";

defineProps<{
  card: Card;
  title?: string;
  titleClass?: string;
}>();

const showModal = ref(false);
</script>

<template>
  <div class="flex flex-shrink-0">
    <Button
      type="button"
      @click="showModal = true"
      :class="
        cn(
          'flex items-center flex-shrink-0 justify-center gap-1 hover:bg-blue/95 transition-all',
          'hover:border-blue focus:border-blue active:border-blue focus:outline-none focus:ring-3 focus:ring-blue-light',
          titleClass,
        )
      "
    >
      {{ title }}
    </Button>
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
      @click.self="showModal = false"
    >
      <UpdateCardModal :card="card" @close="showModal = false" />
    </div>
  </div>
</template>
