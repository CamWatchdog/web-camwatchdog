<template>
  <div class="computer-list">
    <div class="computer-header">
      <h2>Monitoramento</h2>
      <v-btn @click="addEditComputer({})" color="var(--blue-700)" class="add-button">
        Adicionar
      </v-btn>
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
          @keydown.space.prevent
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
      @click="filter"
      class="text-white text-capitalize mb-5"
      height="50"
      width="100"
      color="var(--blue-900)"
    >
      Filtrar
    </v-btn>
    <div v-show="filters.length > 0" class="filters mb-5">
      <div class="filters-title">
        <v-icon icon="mdi-filter-variant" size="large" />
        <span>Filtros</span>
      </div>
      <div class="filtered">
        <v-chip
          v-for="(filter, i) in filters"
          :key="filter.id"
          class="chip"
          size="small"
          variant="flat"
          color="var(--neutral-black)"
          closable
          @click:close="removeFilter(filter, i)"
        >
          {{ filter.text }}
        </v-chip>
      </div>
    </div>
    <div class="list">
      <div v-for="computer in computerList" :key="computer.computerId" class="list-item">
        <v-icon icon="mdi-laptop" color="var(--blue-500)" />
        <div class="list-item-info">
          <div class="date">{{ Util.formatDate(computer.createdAt) }}</div>
          <div class="user">Computador: {{ computer.description }}</div>
        </div>
        <div class="actions">
          <v-btn
            @click="addEditComputer(computer)"
            variant="text"
            icon="mdi-pencil-outline"
            color="var(--blue-500)"
          />
          <v-btn
            variant="text"
            icon="mdi-trash-can-outline"
            color="var(--blue-500)"
            @click="deleteComputer(computer)"
          />
        </div>
      </div>
    </div>
    <v-container>
      <v-row justify="center">
        <v-col cols="5">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              :disabled="loading"
              :length="totalPages"
              @update:modelValue="getComputerList"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <ComputerConfirmDeleteModal
    v-model="showConfirmDeleteModal"
    @delete="getComputerList"
    ref="DeleteModal"
  />
  <ComputerAddEditModal v-model="showAddEditModal" @submit="getComputerList" ref="AddEditModal" />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import ComputerConfirmDeleteModal from './ComputerConfirmDeleteModal.vue';
import ComputerAddEditModal from './ComputerAddEditModal.vue';

import api from '@/api';
import Util from '@/util';

const computerList = ref([]);
const search = ref('');
const pageSize = ref(5);
const page = ref(1);
const totalPages = ref(0);
const showConfirmDeleteModal = ref(false);
const showAddEditModal = ref(false);
const filters = ref([]);
const startTime = ref(null);
const endTime = ref(null);

const loading = ref(false);

const DeleteModal = ref(null);
const AddEditModal = ref(null);

const getComputerList = () => {
  loading.value = true;
  api.Computer.findAll(
    search.value,
    pageSize.value,
    page.value,
    startTime.value?.getTime(),
    endTime.value?.getTime(),
  )
    .then((response) => {
      computerList.value = response.data.data;
      totalPages.value = response.data.totalPages ?? 0;
    })
    .finally(() => {
      loading.value = false;
    });
};

const deleteComputer = (computer) => {
  DeleteModal.value.openModal(computer);
};

const addEditComputer = (computer) => {
  AddEditModal.value.openModal(computer);
};

const filter = () => {
  filters.value = [];
  if (search.value) {
    filters.value.push({ type: 'search', text: `Computador: ${search.value}` });
  }
  if (startTime.value) {
    filters.value.push({
      type: 'startTime',
      text: `Data Início: ${Util.formatDate(startTime.value, 'short')}`,
    });
  }
  if (endTime.value) {
    filters.value.push({
      type: 'endTime',
      text: `Data Final: ${Util.formatDate(endTime.value, 'short')}`,
    });
  }
  getComputerList();
};

const removeFilter = (filter, index) => {
  switch (filter.type) {
    case 'search':
      search.value = '';
      break;
    case 'startTime':
      startTime.value = null;
      break;
    case 'endTime':
      endTime.value = null;
      break;
  }
  filters.value.splice(index, 1);
  getComputerList();
};

onMounted(() => {
  getComputerList();
});
</script>
<style scoped>
.computer-list {
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
  border: 1px solid var(--blue-500);
  padding: 1rem;
  background-color: var(--blue-100);
  color: var(--blue-500);
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

.computer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.computer-header .add-button {
  color: white;
}

.search-user {
  width: 28rem;
  max-width: 100%;
}

.search-dates {
  width: 14rem;
  max-width: 100%;
}

.filters {
  display: flex;
  flex-direction: column;
}

.filters-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filtered {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.chip {
  cursor: pointer;
  vertical-align: middle;
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
  flex-direction: column;
  gap: 0.5rem;
  color: var(--warn-500);
}
</style>
