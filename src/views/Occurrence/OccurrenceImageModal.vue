<template>
  <v-dialog v-model="model" max-width="70vw">
    <v-img max-height="80vh" :src="getImage" />
  </v-dialog>
</template>
<script setup>
import { ref, computed } from 'vue';

const model = defineModel();
const imageValue = ref({});

const getImage = computed(() => `data:image/png;base64,${imageValue.value}`);

const openModal = (image) => {
  imageValue.value = JSON.parse(JSON.stringify(image)) ?? {};
  model.value = true;
};

defineExpose({
  openModal,
});
</script>
