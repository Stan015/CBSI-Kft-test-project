<script setup>
const emit = defineEmits(["file-selected"]);
const fileInput = ref(null);
const isDragging = ref(false);
const errorMessage = ref("");
const uploadedFileName = ref("");

const handleFile = (files) => {
  const file = files[0];
  errorMessage.value = "";
  uploadedFileName.value = "";

  if (!file) return;

  const validTypes = ["image/svg+xml", "image/png", "image/jpeg", "image/gif"];
  if (!validTypes.includes(file.type)) {
    errorMessage.value = "Only SVG, PNG, JPG, or GIF allowed.";
    return;
  }

  const img = new Image();
  img.onload = () => {
    if (img.width <= 800 && img.height <= 400) {
      emit("file-selected", file);
      uploadedFileName.value = file.name;
    } else {
      errorMessage.value = "Image must be max 800x400px.";
    }
  };
  img.src = URL.createObjectURL(file);
};

const onDrop = (e) => {
  isDragging.value = false;
  e.preventDefault();
  handleFile(e.dataTransfer.files);
};

const onChange = (e) => {
  handleFile(e.target.files);
};
</script>

<template>
  <div
    class="border bg-gray-100 rounded-2xl p-10 text-center transition-all duration-200"
    :class="[
      isDragging ? 'bg-blue' : '',
      errorMessage ? 'border-red' : 'border-blue',
    ]"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop="onDrop"
    @click="fileInput.click()"
  >
    <div class="flex justify-center mb-4">
      <div class="bg-blue p-3 rounded-xl">
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66602 12.3333L9.99935 9M9.99935 9L13.3327 12.3333M9.99935 9V16.5M16.666 12.9524C17.6839 12.1117 18.3327 10.8399 18.3327 9.41667C18.3327 6.88536 16.2807 4.83333 13.7493 4.83333C13.5673 4.83333 13.3969 4.73833 13.3044 4.58145C12.2177 2.73736 10.2114 1.5 7.91602 1.5C4.46424 1.5 1.66602 4.29822 1.66602 7.75C1.66602 9.47175 2.36222 11.0309 3.48847 12.1613"
            stroke="white"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <p>
      <span class="text-blue font-semibold cursor-pointer">
        Click to upload
      </span>
      or drag and drop
    </p>
    <p class="text-sm text-gray-600">SVG, PNG, JPG or GIF (max. 800x400px)</p>

    <p v-if="errorMessage" class="text-sm text-red mt-2">
      {{ errorMessage }}
    </p>
    <p v-else-if="uploadedFileName" class="text-sm text-green mt-2 truncate">
      Uploaded: {{ uploadedFileName }}
    </p>

    <input
      ref="fileInput"
      type="file"
      class="hidden"
      accept="image/svg+xml,image/png,image/jpeg,image/gif"
      @change="onChange"
    />
  </div>
</template>
