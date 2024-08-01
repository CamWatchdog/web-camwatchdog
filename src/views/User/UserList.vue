<template>
  <div class="user-list">
    <div class="user-header">
      <h2>Usuários</h2>
      <v-btn @click="addEditUser({})" color="var(--blue-700)" class="add-button"> Adicionar </v-btn>
    </div>
    <v-row dense>
      <v-col cols="auto">
        <span>Buscar</span>
        <v-text-field
          class="search-user"
          density="comfortable"
          label="Nome, CPF, E-mail"
          variant="solo"
          v-model="search"
          hide-details
          single-line
        />
      </v-col>
    </v-row>
    <v-btn
      @click="getUserList"
      class="text-white text-capitalize mb-5 mt-6"
      height="50"
      width="100"
      color="var(--blue-900)"
    >
      Filtrar
    </v-btn>
    <div class="list">
      <div v-for="user in userList" :key="user.userId" class="list-item">
        <v-icon icon="mdi-account-outline" color="var(--blue-500)" />
        <div class="list-item-info">
          <div class="user">Usuário: {{ user.name }}</div>
        </div>
        <div class="actions">
          <v-btn
            @click="addEditUser(user)"
            variant="text"
            icon="mdi-pencil-outline"
            color="var(--blue-500)"
          />
          <v-btn
            variant="text"
            icon="mdi-trash-can-outline"
            color="var(--blue-500)"
            @click="deleteUser(user)"
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
              @update:modelValue="getUserList"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <UserConfirmDeleteModal
    v-model="showConfirmDeleteModal"
    @delete="getUserList"
    ref="DeleteModal"
  />
  <UserAddEditModal v-model="showAddEditModal" @submit="getUserList" ref="AddEditModal" />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import UserConfirmDeleteModal from './UserConfirmDeleteModal.vue';
import UserAddEditModal from './UserAddEditModal.vue';

import api from '@/api';

const userList = ref([]);
const search = ref('');
const pageSize = ref(5);
const page = ref(1);
const totalPages = ref(0);
const showConfirmDeleteModal = ref(false);
const showAddEditModal = ref(false);

const loading = ref(false);

const DeleteModal = ref(null);
const AddEditModal = ref(null);

const getUserList = () => {
  loading.value = true;

  api.Users.findAll(search.value.trim(), pageSize.value, page.value)
    .then((response) => {
      userList.value = response.data.data;
    })
    .finally(() => {
      loading.value = false;
    });
};

const deleteUser = (user) => {
  DeleteModal.value.openModal(user);
};

const addEditUser = (user) => {
  AddEditModal.value.openModal(user);
};

onMounted(() => {
  getUserList();
});
</script>
<style scoped>
.user-list {
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

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-header .add-button {
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
