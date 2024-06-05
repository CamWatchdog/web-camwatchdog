<template>
  <v-dialog v-model="model" max-width="500">
    <Snackbar v-model="snackbar" :message="message" :color="color" />
    <v-card color="var(--blue-700)">
      <v-card-title style="color: white">
        {{ computerValue.computerId ? 'Editar' : 'Criar' }}
      </v-card-title>
      <div v-if="step === 0" class="computer-add-edit-card">
        <v-form @submit.prevent v-model="formValidate" class="computer-add-edit-form">
          <v-text-field
            v-model="computerValue.description"
            density="comfortable"
            variant="solo"
            label="Descrição"
            :rules="[Util.Rules.required]"
          />
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
              type="submit"
              style="color: white"
            >
              {{ computerValue && computerValue.computerId ? 'Editar' : 'Criar' }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </div>
      <div v-else-if="step === 1" class="computer-add-edit-card">
        <v-form class="computer-add-edit-form">
          <v-text-field
            v-model="token"
            readonly
            density="comfortable"
            variant="solo"
            label="Token do Computador"
          />
          <v-card-actions class="d-flex justify-space-between w-100">
            <v-btn
              class="computer-add-edit-btn"
              flat
              @click="close"
              variant="outlined"
              color="white"
            >
              Fechar
            </v-btn>
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
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from 'vue';
import Util from '@/util';
import api from '@/api';
import Snackbar from '@/components/Snackbar.vue';

const model = defineModel();
const computerValue = ref({});
const step = ref(0);
const token = ref('');
const formValidate = ref(false);
const message = ref();
const color = ref();
const snackbar = ref(false);

const emit = defineEmits(['submit']);

const submit = () => {
  if (formValidate.value) {
    if (computerValue.value.computerId) {
      update();
    } else {
      create();
    }
  }
};

const update = () => {
  api.Computer.update(computerValue.value.computerId, computerValue.value).then((resp) => {
    token.value = resp.data;
    step.value = 1;
    emit('submit');
  });
};

const create = () => {
  api.Computer.create(computerValue.value).then((resp) => {
    console.log(resp);
    token.value = resp.data;
    step.value = 1;
    emit('submit');
  });
};

const copy = () => {
  Util.copyToClipboard(token.value);
  color.value = 'success';
  snackbar.value = true;
  message.value = 'Copiado com sucesso!';
};

const openModal = (computer) => {
  computerValue.value = JSON.parse(JSON.stringify(computer)) ?? {};
  console.log(computerValue.value);
  model.value = true;
};

const close = () => {
  model.value = false;
  step.value = 0;
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
