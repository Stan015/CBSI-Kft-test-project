<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue?: string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

// internal reactive array, initialize from modelValue or with one empty slot
const options = ref<string[]>(
  props.modelValue && props.modelValue.length > 0
    ? [...props.modelValue]
    : [""],
);

// keep parent in sync
watch(options, (val) => emit("update:modelValue", [...val]), { deep: true });

// add a new empty option
const addOption = () => {
  options.value.push("");
};

// remove option at index, ensure at least one input remains
const removeOption = (index: number) => {
  options.value.splice(index, 1);
  if (options.value.length === 0) {
    options.value.push("");
  }
};
</script>

<template>
  <div class="space-y-4">
    <label class="block text-md font-bold">Add option</label>

    <div class="space-y-1">
      <div v-for="(opt, i) in options" :key="i" class="flex items-center">
        <input
          v-model="options[i]"
          type="text"
          placeholder="Add an option"
          class="flex-1 bg-gray-light rounded-[1rem] border-[1.8px] border-transparent box-border px-4 py-3 hover:border-blue focus:border-blue active:border-blue focus:outline-none focus:ring-3 focus:ring-blue-light"
        />

        <!-- only show remove if this input has a non-empty value -->
        <button
          v-if="options[i].trim() !== ''"
          @click.prevent="removeOption(i)"
          class="ml-3 text-black font-bold border-2 border-black hover:border-red hover:text-red cursor-pointer flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200"
          aria-label="Remove option"
        >
          <svg
            width="10"
            height="2"
            viewBox="0 0 10 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.125 1.6875H0.875C0.49 1.6875 0.1875 1.385 0.1875 1C0.1875 0.615 0.49 0.3125 0.875 0.3125H9.125C9.51 0.3125 9.8125 0.615 9.8125 1C9.8125 1.385 9.51 1.6875 9.125 1.6875Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>

    <Button
      @click.prevent="addOption"
      class="mt-2 w-full bg-green text-white font-medium rounded-4xl cursor-pointer px-4 py-2 flex gap-2 items-center justify-center hover:bg-green/95 transition"
      aria-label="Add option"
    >
      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.25 7H1.25M6.25 2V12"
          stroke="white"
          stroke-width="2.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Add option
    </Button>
  </div>
</template>
