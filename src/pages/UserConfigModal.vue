<template>
  <v-dialog v-model="model" class="user-config-modal" max-width="528">
    <v-card class="user-config-card">
      <v-card-title class="user-config-title"> Configurações </v-card-title>
      <v-card-text class="content">
        <v-form v-model="formValidate">
          <div class="fields">
            <v-text-field
              v-model="user.name"
              :rules="[Util.Rules.required]"
              variant="solo"
              label="Nome"
            />
            <v-text-field
              v-model="user.cpf"
              :rules="[Util.Rules.required]"
              variant="solo"
              label="CPF"
            />
            <v-text-field
              v-model="user.email"
              :rules="[Util.Rules.required, Util.Rules.email]"
              variant="solo"
              label="E-mail"
            />
            <v-text-field
              v-model="user.currentPassword"
              :rules="[Util.Rules.passwordHasSpecialChar, Util.Rules.passwordMinChar]"
              variant="solo"
              label="Senha atual"
            />
            <v-text-field
              v-model="user.newPassword"
              :rules="[Util.Rules.passwordHasSpecialChar, Util.Rules.passwordMinChar]"
              variant="solo"
              label="Nova senha"
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

const user = ref({
  name: 'John Doe',
  cpf: '123.456.789-00',
  email: '',
  currentPassword: '',
  newPassword: '',
});
const formValidate = ref(false);

const updateUser = () => {
  console.log('update user');
  return api.Users.update(user.value.userId, user.value);
};

const changePassword = () => {
  console.log('change password');
  return api.Users.changeUserPassword(
    user.value.userId,
    user.value.currentPassword,
    user.value.newPassword,
  );
};

const submit = () => {
  console.log('submit');
  if (formValidate.value) {
    if (user.value.newPassword && user.value.currentPassword) {
      changePassword();
    }
    updateUser();
  }
};
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
