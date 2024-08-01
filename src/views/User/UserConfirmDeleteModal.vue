<template>
  <v-dialog v-model="model" max-width="500">
    <v-card title="Atenção!">
      <div class="user-confirm-delete-card">
        <v-icon icon="mdi-alert-decagram" color="var(--warn-500)" class="warn-icon" />
        <p>Tem certeza que deseja excluir o usuário?</p>
        <span>{{ userValue.name }}</span>
        <v-card-actions class="d-flex justify-space-between w-100">
          <v-btn class="user-confirm-delete-btn" flat @click="model = false"> Cancelar </v-btn>
          <v-btn
            class="user-confirm-delete-btn"
            variant="elevated"
            color="var(--red-500)"
            @click="submit"
            style="color: white"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>
<script setup>
import api from '@/api';
import { ref } from 'vue';

const model = defineModel();
const userValue = ref(null);

const emit = defineEmits(['delete']);

const submit = () => {
  api.Users.delete(userValue.value.userId).then(() => {
    model.value = false;
    emit('delete');
  });
};

const openModal = (user) => {
  userValue.value = user;
  model.value = true;
};

defineExpose({
  openModal,
});
</script>
<style scoped>
.user-confirm-delete-card {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 2rem;
}

.user-confirm-delete-card p {
  font-size: 1.5rem;
}

.warn-icon {
  font-size: 7rem;
}
</style>
