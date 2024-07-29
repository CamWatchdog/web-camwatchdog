<template>
  <div class="occurrence-list">
    <div class="occurrence-header">
      <h2>Ocorrências</h2>
    </div>
    <v-row dense>
      <v-col cols="auto">
        <span>Buscar</span>
        <v-text-field
          class="search-user"
          density="comfortable"
          label="Computador"
          variant="solo"
          v-model="search"
          hide-details
          single-line
        />
      </v-col>
      <v-col cols="2">
        <span>Data Início</span>
        <v-date-input
          v-model="startTime"
          variant="solo"
          prepend-icon=""
          prepend-inner-icon="$calendar"
          placeholder="DD/MM/AAAA"
        />
      </v-col>
      <v-col cols="2">
        <span>Data Final</span>
        <v-date-input
          v-model="endTime"
          variant="solo"
          prepend-icon=""
          prepend-inner-icon="$calendar"
          placeholder="DD/MM/AAAA"
        />
      </v-col>
    </v-row>
    <v-btn
      @click="getOccurrenceList"
      class="text-white text-capitalize mb-5"
      height="50"
      width="100"
      color="var(--blue-900)"
    >
      Filtrar
    </v-btn>
    <div class="list">
      <v-expansion-panels
        v-for="occurrence in occurrenceList"
        :key="occurrence.occurrenceId"
        class="list-item"
        flat
      >
        <v-expansion-panel style="border: 1px solid var(--warn-500)" bg-color="var(--warn-100)">
          <v-expansion-panel-title>
            <template #actions="{ expanded }">
              <v-icon color="var(--warn-500)" :icon="`mdi-chevron-${expanded ? 'up' : 'down'}`" />
            </template>
            <v-icon icon="mdi-shield-alert-outline" color="var(--warn-500)" />
            <div class="infos">
              <div>{{ Util.formatDate(occurrence.createdAt) }}</div>
              <div>Usuário: {{ occurrence.user }}</div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="images">
              <v-btn
                flat
                density="compact"
                :ripple="false"
                variant="text"
                @click="imageOccurrence(occurrence.printFileBase64)"
              >
                Imagem da Tela
              </v-btn>
              <v-btn
                flat
                density="compact"
                :ripple="false"
                variant="text"
                @click="imageOccurrence(occurrence.frameFileBase64)"
              >
                Imagem da Câmera
              </v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-container>
      <v-row justify="center">
        <v-col cols="5">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              :disabled="loading"
              :length="totalPages"
              @update:modelValue="getOccurrenceList"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <OccurrenceImageModal v-model="showImageModal" ref="ImageModal" />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import OccurrenceImageModal from './OccurrenceImageModal.vue';

import api from '@/api';
import Util from '@/util';

const occurrenceList = ref([]);
const search = ref('');
const pageSize = ref(5);
const page = ref(1);
const totalPages = ref(0);
const showImageModal = ref(false);
const startTime = ref(null);
const endTime = ref(null);

const loading = ref(false);

const ImageModal = ref(null);

const getOccurrenceList = () => {
  loading.value = true;

  if (startTime.value > endTime.value) {
    const aux = endTime.value;
    endTime.value = startTime.value;
    startTime.value = aux;
  }

  api.Occurrence.findAll(
    search.value.trim(),
    pageSize.value,
    page.value,
    endTime.value?.getTime(),
    startTime.value?.getTime(),
  )
    .then((response) => {
      occurrenceList.value = response.data.data;
      totalPages.value = response.data.totalPages ?? 0;
    })
    .finally(() => {
      loading.value = false;
    });
};

const imageOccurrence = (fileBase64) => {
  ImageModal.value.openModal(fileBase64);
};

onMounted(() => {
  getOccurrenceList();
});
</script>
<style scoped>
.occurrence-list {
  padding: 1rem;
}

.list {
  display: flex;
  width: 100%;
  gap: 1rem;
  flex-direction: column;
}

.list-item {
  align-items: center;
  display: flex;
  gap: 1rem;
  width: 100%;
  border-radius: 4px;
}

.list-item-info {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.actions {
  display: flex;
}

.occurrence-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.occurrence-header .add-button {
  color: white;
}

.search-user {
  width: 28rem;
  max-width: 100%;
}

.search-user > {
  padding: 1rem;
}

.search-dates {
  width: 14rem;
  max-width: 100%;
}

.infos {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--warn-500);
  margin-left: 1rem;
}

.images {
  display: flex;
  gap: 0.5rem;
  color: var(--warn-500);
  text-decoration: underline;
}
</style>
