<script setup lang="ts">
const props = defineProps({
  modelValue: [String, Number],
});
const emit = defineEmits(["update:modelValue"]);

const attrs = useAttrs();

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);

const hasValue = computed(() => {
  return (
    props.modelValue !== "" &&
    props.modelValue !== null &&
    props.modelValue !== undefined
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
      ? "text-blue translate-y-1 text-sm"
      : "text-gray translate-y-4",
  ),
);

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="relative w-full">
    <label :class="labelClasses">{{
      attrs.label || attrs.placeholder || "Type Something..."
    }}</label>
    <input
      ref="inputRef"
      v-bind="$attrs"
      :value="String(props.modelValue ?? '')"
      @input="onInput"
      @focus="handleFocus"
      @blur="handleBlur"
      :class="classes"
      :placeholder="!isFocused && !hasValue ? '' : ''"
    />
  </div>
</template>
