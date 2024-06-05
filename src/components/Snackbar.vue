<template>
  <v-snackbar
    location="end top"
    id="snackbar"
    :timeout="3000"
    :color="color"
    variant="flat"
    :text="message"
    v-model="snackbar"
  >
  </v-snackbar>
</template>

<script setup>
import { computed } from 'vue';

const snackbar = defineModel();
const props = defineProps(['message', 'color']);
const color = computed(() => props.color);
const message = computed(() => props.message);
</script>
