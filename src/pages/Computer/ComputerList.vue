<template>
  <div class="computer-list">
    <div class="computer-header">
      <h2>Monitoramento</h2>
      <v-btn @click="addEditComputer({})" color="var(--blue-700)" class="add-button">
        Adicionar
      </v-btn>
    </div>
    <div class="filter">
      <div class="search"></div>
      <div class="start-time"></div>
      <div class="end-time"></div>
    </div>
    <div class="list">
      <div v-for="computer in computerList" :key="computer.computerId" class="list-item">
        <v-icon icon="mdi-laptop" color="var(--blue-500)" />
        <div class="list-item-info">
          <div class="date">{{ util.formatDate(computer.createdAt) }}</div>
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
  </div>
  <ComputerConfirmDeleteModal v-model="showConfirmDeleteModal" ref="DeleteModal" />
  <ComputerAddEditModal v-model="showAddEditModal" ref="AddEditModal" />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import ComputerConfirmDeleteModal from './ComputerConfirmDeleteModal.vue';
import ComputerAddEditModal from './ComputerAddEditModal.vue';

import util from '@/util';
import api from '../../api';

const computerList = ref([]);
const search = ref('');
const pageSize = ref(0);
const page = ref(1);
const showConfirmDeleteModal = ref(false);
const showAddEditModal = ref(false);

const DeleteModal = ref(null);
const AddEditModal = ref(null);

const getComputerList = async () => {
  api.Computer.findAll(search.value, pageSize.value, page.value).then((response) => {
    console.log(response.data.data);
    computerList.value = response.data.data;
  });
};

const deleteComputer = (computer) => {
  DeleteModal.value.openModal(computer);
};

const addEditComputer = (computer) => {
  AddEditModal.value.openModal(computer);
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
</style>
