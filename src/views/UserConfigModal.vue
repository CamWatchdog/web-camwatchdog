<template>
  <Snackbar v-model="snackbar" :message="message" :color="color" :location="location" />
  <v-dialog v-model="model" class="user-config-modal" max-width="528">
    <v-card class="user-config-card">
      <v-card-title class="user-config-title"> Configurações </v-card-title>
      <v-card-text class="content">
        <v-form @submit.prevent v-model="formValidate">
          <div class="fields">
            <v-text-field
              v-model="name"
              :rules="[Util.Rules.required]"
              variant="solo"
              label="Nome"
              @keydown.space.prevent
            />
            <v-text-field
              v-model="cpf"
              :rules="[Util.Rules.required]"
              variant="solo"
              label="CPF"
              v-maska="'###.###.###-##'"
              @keydown.space.prevent
            />
            <v-text-field
              v-model="email"
              :rules="[Util.Rules.required, Util.Rules.email]"
              variant="solo"
              label="E-mail"
              @keydown.space.prevent
            />
            <v-text-field
              v-model="currentPassword"
              :rules="[Util.Rules.passwordHasSpecialChar, Util.Rules.passwordMinChar]"
              variant="solo"
              label="Senha atual"
              :type="show1 ? 'text' : 'password'"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="show1 = !show1"
              @keydown.space.prevent
            />
            <v-text-field
              v-model="newPassword"
              :rules="[Util.Rules.passwordHasSpecialChar, Util.Rules.passwordMinChar]"
              variant="solo"
              label="Nova senha"
              :type="show2 ? 'text' : 'password'"
              :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="show2 = !show2"
              @keydown.space.prevent
            />
          </div>
          <v-btn class="user-config-btn" type="submit" @click="submit"> Confirmar </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from 'vue';
import api from '@/api';
import Util from '@/util';

const model = defineModel();
const name = ref();
const cpf = ref();
const email = ref();
const currentPassword = ref();
const newPassword = ref();
const formValidate = ref(false);
const show1 = ref(false);
const show2 = ref(false);

const location = ref();
const message = ref();
const color = ref();
const snackbar = ref(false);

const updateUser = () => {
  const userLogged = JSON.parse(localStorage.getItem('user'));

  api.Users.update(userLogged.userId, {
    name: name.value,
    cpf: cpf.value.replace(/\D/g, ''),
    email: email.value,
    currentPassword: currentPassword.value,
    password: newPassword.value,
  })
    .then((response) => {
      if (response.status >= 200 && response.status <= 300) {
        message.value = 'Usuário atualizado com sucesso';
        location.value = 'end top';
        color.value = 'success';
        snackbar.value = true;
        close();
      }
    })
    .catch(() => {
      color.value = 'error';
      message.value = 'Erro ao atualizar as informações';
      location.value = 'end top';
      snackbar.value = true;
    });
};

const close = () => {
  model.value = false;
};

const submit = () => {
  if (formValidate.value) {
    updateUser();
  }
};

const findUser = async () => {
  const userLogged = JSON.parse(localStorage.getItem('user'));

  return await api.Users.findOne(userLogged.userId);
};

const openModal = async () => {
  const user = await findUser().catch(() => {
    color.value = 'error';
    message.value = 'Erro ao buscar informações do usuário';
    location.value = 'end top';
    snackbar.value = true;
  });

  name.value = user.data.name;
  cpf.value = user.data.cpf;
  email.value = user.data.email;

  model.value = true;
};

defineExpose({
  openModal,
});
</script>
<style scoped>
.user-config-card {
  background: var(--blue-700);
  padding: 2rem 1rem;
}

.user-config-title {
  width: 100%;
  text-align: center;
  color: white;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-config-btn {
  background: var(--blue-500);
  color: white;
  width: 100%;
}
</style>
