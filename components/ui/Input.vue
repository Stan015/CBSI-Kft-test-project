<script setup lang="ts">
const attrs = useAttrs();

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const modelValue = ref(attrs.modelValue || "");

const hasValue = computed(() => {
  return (
    modelValue.value !== "" &&
    modelValue.value !== null &&
    modelValue.value !== undefined
  );
});

const classes = computed(() =>
  cn(
    "w-full text-sm text-primary bg-gray-light h-14 rounded px-3 pt-3 border-[1.8px] border-transparent box-border rounded-[1rem]",
    "transition-all duration-200",
    "hover:border-blue focus:border-blue active:border-blue focus:outline-none focus:ring-3 focus:ring-blue-light",
    attrs.class as string,
  ),
);

const labelClasses = computed(() =>
  cn(
    "absolute left-3 transition-all font-medium duration-200 pointer-events-none",
    isFocused.value || hasValue.value
      ? "text-blue translate-y-4 text-sm top-1"
      : "text-gray translate-y-8",
  ),
);

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

onMounted(() => {
  if (attrs.modelValue) {
    modelValue.value = attrs.modelValue;
  }
});
</script>

<template>
  <div class="relative w-full">
    <label :class="labelClasses">{{
      attrs.label || attrs.placeholder || "Type Something..."
    }}</label>
    <input
      ref="inputRef"
      v-bind="$attrs"
      :value="modelValue"
      @input="
        modelValue =
          ($event.target && ($event.target as HTMLInputElement).value) || ''
      "
      @focus="handleFocus"
      @blur="handleBlur"
      :class="classes"
      :placeholder="!isFocused && !hasValue ? '' : ''"
    />
  </div>
</template>
