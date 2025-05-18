<script setup lang="ts">
import type { Card } from "~/types/card";

const props = defineProps({
  card: {
    type: Object as PropType<Card>,
    required: true,
  },
  wrapperClass: {
    type: String,
    default: "",
  },
  titleClass: {
    type: String,
    default: "",
  },
  imageClass: {
    type: String,
    default: "",
  },
  descriptionClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:selectedOptions"]);
const cardsStore = useCardsStore();

// Use a local copy for selected option indexes
const localSelectedOptionIndexes = ref(
  Array.isArray(props.card.selectedOptions)
    ? [...props.card.selectedOptions]
    : [],
);

// Watch for changes from parent/store
watch(
  () => props.card.selectedOptions,
  (newVal) => {
    if (Array.isArray(newVal)) {
      localSelectedOptionIndexes.value = [...newVal];
    }
  },
);

// Update local state and store
function onCheckboxChange(index: number) {
  const idx = localSelectedOptionIndexes.value.indexOf(index);
  if (idx === -1) {
    localSelectedOptionIndexes.value.push(index);
  } else {
    localSelectedOptionIndexes.value.splice(idx, 1);
  }

  // Directly update the store
  cardsStore.updateCard(props.card.id, {
    selectedOptions: [...localSelectedOptionIndexes.value],
  });

  emit("update:selectedOptions", {
    id: props.card.id,
    selectedOptions: [...localSelectedOptionIndexes.value],
  });
}
</script>

<template>
  <NuxtLink
    :to="`/${card.id}`"
    :class="
      cn(
        'bg-white shadow-lg rounded-2xl p-6 w-full max-h-[28rem] hover:shadow-xl transition-all duration-300 hover:transform hover:scale-102',
        wrapperClass,
      )
    "
  >
    <h2 :class="cn('text-lg font-bold mb-4', titleClass)">{{ card.title }}</h2>
    <img
      v-if="card.imageSrc"
      :src="card.imageSrc"
      :alt="card.title"
      :class="cn('w-full h-50 object-cover rounded-2xl mb-4', imageClass)"
    />
    <p
      :class="
        cn(
          'text-primary mb-4 overflow-hidden',
          {
            'line-clamp-5': card.imageSrc !== null,
            'h-[90%]':
              !card.imageSrc && card.cardStyle === 'default-card-style',
            'line-clamp-7 ':
              !card.imageSrc && card.cardStyle === 'checkbox-card-style',
          },
          descriptionClass,
        )
      "
    >
      {{ card.description }}
    </p>

    <div
      v-if="
        card.cardStyle === 'checkbox-card-style' &&
        card.options &&
        card.options.length
      "
      class="flex flex-col gap-2 overflow-y-scroll scrollbar-hide"
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
          :value="index"
          :checked="localSelectedOptionIndexes.includes(index)"
          class="shrink-0 cursor-pointer w-5 h-5 border-2"
          @change="onCheckboxChange(index)"
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
</template>
