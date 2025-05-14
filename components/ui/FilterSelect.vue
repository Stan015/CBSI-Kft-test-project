<script setup>
const attrs = useAttrs();
const isOpen = ref(false);
const selectedOptions = ref([]);
const placeholder = attrs.placeholder || "Filter";
const selectRef = ref(null);
const options = ref(attrs.options || []);
const emit = defineEmits(["update:selectedOptions"]);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

// Toggle option selection
const toggleOption = (value) => {
  if (value === "all") {
    if (selectedOptions.value.includes("all")) {
      // If 'All' is being unchecked, clear all selections
      selectedOptions.value = [];
    } else {
      // If 'All' is being checked, select all options
      selectedOptions.value = ["all", ...options.value.map((opt) => opt.value)];
    }
  } else {
    const allIndex = selectedOptions.value.indexOf("all");

    if (selectedOptions.value.includes(value)) {
      // Remove this option
      selectedOptions.value = selectedOptions.value.filter(
        (item) => item !== value,
      );

      // Also remove 'All' if it was selected
      if (allIndex !== -1) {
        selectedOptions.value = selectedOptions.value.filter(
          (item) => item !== "all",
        );
      }
    } else {
      // Add this option
      selectedOptions.value.push(value);

      // Check if we should add 'All' (when all individual options are selected)
      const allOptionsSelected = options.value.every((opt) =>
        selectedOptions.value.includes(opt.value),
      );

      if (allOptionsSelected && allIndex === -1) {
        selectedOptions.value.push("all");
      }
    }
  }

  // Emit the updated selection
  emit("update:selectedOptions", selectedOptions.value);
};

// Check if an option is selected
const isSelected = (value) => {
  return selectedOptions.value.includes(value);
};

// Close the dropdown when clicking outside
const handleClickOutside = (event) => {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

// Get display text for selected options
const selectedText = computed(() => {
  if (selectedOptions.value.length === 0) {
    return "";
  }

  if (selectedOptions.value.includes("all")) {
    return "All";
  }

  if (selectedOptions.value.length === 1) {
    const option = options.value.find(
      (opt) => opt.value === selectedOptions.value[0],
    );
    return option ? option.label : "";
  }

  return `${selectedOptions.value.length} selected`;
});

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
    selectedOptions.value.length > 0 || isOpen.value
      ? "text-blue -translate-y-3 text-sm top-2"
      : "text-gray",
  ),
);

const dropdownClasses = computed(() =>
  cn(
    "absolute top-full mt-1 w-full bg-white rounded-md shadow-md z-10 transition-all duration-200",
    isOpen.value
      ? "opacity-100 scale-100"
      : "opacity-0 scale-95 pointer-events-none",
  ),
);

const optionClasses = (selected) =>
  cn(
    "flex items-center px-4 py-3 cursor-pointer",
    selected ? "bg-blue-50" : "hover:bg-gray-50",
  );

const checkboxClasses = (selected) =>
  cn(
    "w-6 h-6 flex items-center justify-center rounded border-2",
    selected ? "bg-blue border-blue text-white" : "border-gray-400",
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
          selectedText
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
      <!-- All option -->
      <div
        :class="optionClasses(isSelected('all'))"
        @click="toggleOption('all')"
        role="option"
        :aria-selected="isSelected('all').toString()"
      >
        <div :class="checkboxClasses(isSelected('all'))" class="mr-3">
          <svg
            v-if="isSelected('all')"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12L10 17L19 8"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span class="text-lg font-normal">All</span>
      </div>

      <!-- Individual options -->
      <template v-for="option in options" :key="option.value">
        <div
          :class="optionClasses(isSelected(option.value))"
          @click="toggleOption(option.value)"
          role="option"
          :aria-selected="isSelected(option.value).toString()"
        >
          <div :class="checkboxClasses(isSelected(option.value))" class="mr-3">
            <svg
              v-if="isSelected(option.value)"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12L10 17L19 8"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="text-lg font-normal">{{ option.label }}</span>
        </div>
      </template>

      <!-- Slot for custom options if needed -->
      <slot
        name="options"
        :toggleOption="toggleOption"
        :isSelected="isSelected"
      />
    </div>
  </div>
</template>
