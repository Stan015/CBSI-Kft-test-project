<script lang="ts" setup>
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
</script>

<template>
  <div
    :class="
      cn(
        'bg-white shadow-lg rounded-2xl p-6 w-full max-h-[28rem] hover:shadow-xl transition-all duration-300 hover:transform hover:scale-102',
        wrapperClass,
      )
    "
  >
    <div
      :class="
        cn('bg-gray animate-pulse mb-4 w-full h-6 rounded-2xl', titleClass)
      "
    />
    <div
      :class="
        cn('w-full h-50 bg-gray animate-pulse rounded-2xl mb-4', imageClass)
      "
    />
    <div class="mb-4">
      <div
        :class="
          cn(
            'bg-gray animate-pulse mb-2 w-full h-5 rounded-2xl',
            descriptionClass,
          )
        "
      />
      <div
        :class="
          cn(
            'bg-gray animate-pulse mb-2 w-full h-5 rounded-2xl',
            descriptionClass,
          )
        "
      />
      <div
        :class="
          cn(
            'bg-gray animate-pulse mb-2 w-full h-5 rounded-2xl',
            descriptionClass,
          )
        "
      />
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <div class="shrink-0 bg-gray animate-pulse w-5 h-5 rounded-2xl" />
        <div class="bg-gray animate-pulse w-full h-5 rounded-2xl" />
      </div>
      <div class="flex items-center gap-2">
        <div class="shrink-0 bg-gray animate-pulse w-5 h-5 rounded-2xl" />
        <div class="bg-gray animate-pulse w-full h-5 rounded-2xl" />
      </div>
    </div>
  </div>
</template>
