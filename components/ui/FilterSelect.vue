<script setup>
const attrs = useAttrs();
const isOpen = ref(false);
const selectedOptions = ref([]);
const placeholder = attrs.placeholder || "Filter";
const showSelected = attrs.showSelected || false;
const selectRef = ref(null);
const options = ref(attrs.options || []);
const emit = defineEmits(["update:selectedOptions"]);

const props = defineProps({
  triggerClass: {
    type: String,
    default: "",
  },
  dropdownClass: {
    type: String,
    default: "",
  },
  checkboxClass: {
    type: String,
    default: "",
  },
  optionClass: {
    type: String,
    default: "",
  },
});

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
    props.triggerClass,
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
    "absolute top-full mt-1 w-full bg-white rounded-md shadow-md z-10 transition-all duration-200 overflow-hidden",
    isOpen.value
      ? "opacity-100 scale-100"
      : "opacity-0 scale-95 pointer-events-none",
    props.dropdownClass,
  ),
);

const optionClasses = (selected) =>
  cn(
    "flex items-center px-4 py-3 cursor-pointer",
    selected ? "bg-blue-50" : "hover:bg-gray-50",
    props.optionClass,
  );

const checkboxClasses = (selected) =>
  cn(
    "w-6 h-6 flex items-center justify-center flex-shrink-0 rounded border-2",
    selected ? "bg-blue border-blue text-white" : "border-gray-400",
    props.checkboxClass,
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
        <span v-if="showSelected" :class="labelClasses">{{ placeholder }}</span>
        <span v-else>{{ placeholder }}</span>
        <span
          v-if="showSelected"
          class="block truncate pt-4 text-sm font-normal h-full"
          >{{ selectedText }}</span
        >
      </span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_4520_1509)">
          <path
            d="M0 1.9C0 1.66131 0.0948212 1.43239 0.263604 1.2636C0.432387 1.09482 0.661305 1 0.9 1H11.1C11.3387 1 11.5676 1.09482 11.7364 1.2636C11.9052 1.43239 12 1.66131 12 1.9C12 2.13869 11.9052 2.36761 11.7364 2.5364C11.5676 2.70518 11.3387 2.8 11.1 2.8H0.9C0.661305 2.8 0.432387 2.70518 0.263604 2.5364C0.0948212 2.36761 0 2.13869 0 1.9ZM2.4 5.5C2.4 5.26131 2.49482 5.03239 2.6636 4.8636C2.83239 4.69482 3.06131 4.6 3.3 4.6H8.7C8.93869 4.6 9.16761 4.69482 9.3364 4.8636C9.50518 5.03239 9.6 5.26131 9.6 5.5C9.6 5.7387 9.50518 5.96761 9.3364 6.1364C9.16761 6.30518 8.93869 6.4 8.7 6.4H3.3C3.06131 6.4 2.83239 6.30518 2.6636 6.1364C2.49482 5.96761 2.4 5.7387 2.4 5.5ZM5.1 8.2C4.86131 8.2 4.63239 8.29482 4.4636 8.4636C4.29482 8.63239 4.2 8.86131 4.2 9.1C4.2 9.3387 4.29482 9.56761 4.4636 9.7364C4.63239 9.90518 4.86131 10 5.1 10H6.9C7.1387 10 7.36761 9.90518 7.5364 9.7364C7.70518 9.56761 7.8 9.3387 7.8 9.1C7.8 8.86131 7.70518 8.63239 7.5364 8.4636C7.36761 8.29482 7.1387 8.2 6.9 8.2H5.1Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_4520_1509">
            <rect width="12" height="12" fill="white" />
          </clipPath>
        </defs>
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
        <span>All</span>
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
          <span>{{ option.label }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
