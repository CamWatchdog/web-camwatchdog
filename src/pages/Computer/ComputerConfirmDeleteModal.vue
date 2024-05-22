<template>
  <v-dialog v-model="model" max-width="500">
    <v-card title="Atenção!">
      <div class="computer-confirm-delete-card">
        <v-icon icon="mdi-alert-decagram" color="var(--warn-500)" class="warn-icon" />
        <p>Tem certeza que deseja excluir o computador?</p>
        <span>{{ computerValue.description }}</span>
        <v-card-actions class="d-flex justify-space-between w-100">
          <v-btn class="computer-confirm-delete-btn" flat @click="model = false"> Cancelar </v-btn>
          <v-btn
            class="computer-confirm-delete-btn"
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
import { ref } from 'vue';

const model = defineModel();
const computerValue = ref(null);

const submit = () => {
  console.log('delete computer');
};

const openModal = (computer) => {
  computerValue.value = computer;
  model.value = true;
};

defineExpose({
  openModal,
});
</script>
<style scoped>
.computer-confirm-delete-card {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 2rem;
}

.computer-confirm-delete-card p {
  font-size: 1.5rem;
}

.warn-icon {
  font-size: 7rem;
}
</style>
