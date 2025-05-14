<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Object, null],
    default: null,
  },
  placeholder: {
    type: String,
    default: "Select an option",
  },
});

const attrs = useAttrs();
const isOpen = ref(false);
const selected = ref(props.modelValue);
const selectRef = ref(null);
const emit = defineEmits(["update:modelValue"]);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

// Function to select an option
const selectOption = (value) => {
  if (selected.value === value) {
    selected.value = "";
    emit("update:modelValue", "");
  } else {
    selected.value = value;
    emit("update:modelValue", value);
  }
  isOpen.value = false;
};

// Watch for external modelValue changes
watch(
  () => props.modelValue,
  (newValue) => {
    selected.value = newValue;
  },
);

// Close the dropdown when clicking outside
const handleClickOutside = (event) => {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const containerClasses = computed(() => cn("relative w-full", attrs.class));

const triggerClasses = computed(() =>
  cn(
    "text-primary bg-gray-light h-14 flex items-center rounded px-3 py-2 border-[1.8px] border-transparent box-border rounded-[1rem]",
    "transition-all duration-200 cursor-pointer flex items-center justify-between",
    "hover:border-blue focus:border-blue active:border-blue focus:outline-none focus:ring-3 focus:ring-blue-light",
  ),
);

const labelClasses = computed(() =>
  cn(
    "absolute text-base font-medium space-y-full transition-all duration-200 pointer-events-none",
    selected.value || isOpen.value
      ? "text-blue -translate-y-3 text-sm top-2"
      : "text-gray",
  ),
);

const dropdownClasses = computed(() =>
  cn(
    "absolute top-full mt-1 w-full bg-white rounded-md overflow-hidden shadow-md z-10 transition-all duration-200",
    isOpen.value
      ? "opacity-100 scale-100"
      : "opacity-0 scale-95 pointer-events-none",
  ),
);
</script>

<template>
  <div :class="containerClasses" ref="selectRef">
    <div
      :class="triggerClasses"
      @click="toggleOpen"
      role="button"
      :aria-haspopup="true"
      :aria-expanded="isOpen.toString()"
      tabindex="0"
      :aria-label="placeholder"
    >
      <span class="relative w-full h-full flex items-center">
        <span :class="labelClasses">{{ placeholder }}</span>
        <span class="block truncate pt-4 text-sm font-normal h-full">{{
          selected || ""
        }}</span>
      </span>
      <svg
        width="12"
        height="8"
        class="w-4 h-4 ml-2 transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : 'rotate-0'"
        viewBox="0 0 12 8"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M11 1.5L6 6.5L1 1.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <div
      :class="dropdownClasses"
      role="listbox"
      :aria-hidden="(!isOpen).toString()"
    >
      <slot name="options" :selectOption="selectOption" :selected="selected" />
    </div>
  </div>
</template>
