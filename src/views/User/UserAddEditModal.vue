<template>
  <Snackbar v-model="snackbar" :message="message" :color="color" :location="location" />
  <v-dialog v-model="model" max-width="500">
    <v-card color="var(--blue-700)">
      <v-card-title style="color: white">
        {{ userValue.userId ? 'Editar' : 'Criar' }}
      </v-card-title>
      <div class="user-add-edit-card">
        <v-form @submit.prevent v-model="formValidate" class="user-add-edit-form">
          <v-text-field
            v-model="userValue.name"
            density="comfortable"
            variant="solo"
            label="Nome"
            :rules="[Util.Rules.required]"
          />
          <v-text-field
            v-model="userValue.email"
            density="comfortable"
            variant="solo"
            label="E-mail"
            type="email"
            :rules="[Util.Rules.required, Util.Rules.email]"
          />
          <v-text-field
            v-model="userValue.cpf"
            density="comfortable"
            variant="solo"
            label="CPF"
            v-maska="'###.###.###-##'"
            :rules="[Util.Rules.required]"
          />
          <v-text-field
            v-if="!userValue.userId"
            v-model="userValue.password"
            density="comfortable"
            variant="solo"
            label="Senha"
            :type="show1 ? 'text' : 'password'"
            @click:append-inner="show1 = !show1"
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[
              Util.Rules.required,
              Util.Rules.passwordHasSpecialChar,
              Util.Rules.passwordMinChar,
            ]"
          />
          <v-text-field
            v-if="!userValue.userId"
            v-model="userValue.confirmPassword"
            density="comfortable"
            variant="solo"
            :type="show2 ? 'text' : 'password'"
            @click:append-inner="show2 = !show2"
            :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Confirmar Senha"
            :rules="[
              Util.Rules.required,
              Util.Rules.passwordHasSpecialChar,
              Util.Rules.passwordMinChar,
            ]"
          />
          <v-card-actions class="d-flex justify-space-between w-100">
            <v-btn
              class="user-add-edit-btn"
              flat
              @click="model = false"
              variant="outlined"
              color="white"
            >
              Cancelar
            </v-btn>
            <v-btn
              class="user-add-edit-btn"
              variant="elevated"
              color="var(--blue-500)"
              @click="submit"
              type="submit"
              style="color: white"
            >
              {{ userValue && userValue.userId ? 'Editar' : 'Criar' }}
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
const userValue = ref({});
const formValidate = ref(false);
const location = ref();
const message = ref();
const color = ref();
const snackbar = ref(false);
const show1 = ref(false);
const show2 = ref(false);

const emit = defineEmits(['submit']);

const submit = () => {
  if (formValidate.value) {
    if (userValue.value.userId) {
      update();
    } else {
      create();
    }
  }
};

const update = () => {
  const dto = {
    name: userValue.value.name,
    email: userValue.value.email,
    cpf: userValue.value.cpf.replace(/\D/g, ''),
  };
  api.Users.update(userValue.value.userId, dto).then(() => {
    emit('submit');
    message.value = 'Usuário atualizado com sucesso';
    location.value = 'end top';
    color.value = 'success';
    snackbar.value = true;
  });
};

const create = () => {
  if (userValue.value.password === userValue.value.confirmPassword) {
    const dto = {
      name: userValue.value.name,
      email: userValue.value.email,
      cpf: userValue.value.cpf.replace(/\D/g, ''),
      password: userValue.value.password,
    };
    api.Users.create(dto).then(() => {
      model.value = false;
      emit('submit');
      message.value = 'Usuário criado com sucesso';
      location.value = 'end top';
      color.value = 'success';
      snackbar.value = true;
    });
  } else {
    message.value = 'As senhas não conferem';
    location.value = 'end top';
    color.value = 'error';
    snackbar.value = true;
  }
};

const openModal = (user) => {
  userValue.value =
    JSON.parse(JSON.stringify({ ...user, confirmPassword: '', password: '' })) ?? {};
  model.value = true;
};

defineExpose({
  openModal,
});
</script>
<style scoped>
.user-add-edit-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
}

.user-add-edit-card p {
  font-size: 1.5rem;
}

.user-add-edit-form {
  width: 100%;
}

.warn-icon {
  font-size: 7rem;
}
</style>
