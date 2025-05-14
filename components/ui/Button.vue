<script setup lang="ts">
const attrs = useAttrs();

// Compute combined class strings
const classes = computed(() =>
  cn(
    "bg-blue text-white rounded-[2.25rem] px-4 py-2 cursor-pointer",
    attrs.class as string,
  ),
);
</script>

<template>
  <button v-bind="attrs" :class="classes">
    <slot />
  </button>
</template>
