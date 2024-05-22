<template>
  <v-dialog v-model="model" max-width="500">
    <v-card color="var(--blue-700)">
      <v-card-title style="color: white">
        {{ computerValue.computerId ? 'Editar' : 'Criar' }}
      </v-card-title>
      <div v-if="step === 0" class="computer-add-edit-card">
        <v-form class="computer-add-edit-form">
          <v-text-field
            v-model="computerValue.description"
            density="comfortable"
            variant="solo"
            label="Descrição"
            :rules="[Util.Rules.required]"
          />
        </v-form>
        <v-card-actions class="d-flex justify-space-between w-100">
          <v-btn
            class="computer-add-edit-btn"
            flat
            @click="model = false"
            variant="outlined"
            color="white"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="computer-add-edit-btn"
            variant="elevated"
            color="var(--blue-500)"
            @click="submit"
            style="color: white"
          >
            {{ computerValue && computerValue.computerId ? 'Editar' : 'Criar' }}
          </v-btn>
        </v-card-actions>
      </div>
      <div v-else-if="step === 1" class="computer-add-edit-card">
        <v-card-actions class="d-flex justify-space-between w-100">
          <v-btn
            class="computer-add-edit-btn"
            variant="elevated"
            color="var(--blue-500)"
            @click="copy"
            style="color: white"
          >
            Copiar Token
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from 'vue';
import Util from '@/util';

const model = defineModel();
const computerValue = ref({});
const step = ref(0);

const submit = () => {
  step.value = 1;
};

const openModal = (computer) => {
  computerValue.value = JSON.parse(JSON.stringify(computer)) ?? {};
  model.value = true;
};

defineExpose({
  openModal,
});
</script>
<style scoped>
.computer-add-edit-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
}

.computer-add-edit-card p {
  font-size: 1.5rem;
}

.computer-add-edit-form {
  width: 100%;
}

.warn-icon {
  font-size: 7rem;
}
</style>
