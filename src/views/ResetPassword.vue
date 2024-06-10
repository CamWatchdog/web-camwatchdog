<template>
  <v-container class="d-flex justify-end pa-0" fluid fill-height>
    <div class="background-image"></div>
    <div class="reset-container">
      <v-container>
        <v-img class="logo-image" src="/logo.png" alt="Logo"></v-img>
      </v-container>
      <v-card class="reset-card" rounded="0" color="#1B2440">
        <v-card-title class="text-center">Redefinição de Senha</v-card-title>
        <v-form @submit="handleSubmit">
          <v-card-text class="pl-0 pr-0 pt-0">
            <v-text-field
              variant="solo"
              density="comfortable"
              v-model="email"
              label="Email"
              :rules="[Util.Rules.blankInput]"
              @keydown.space.prevent
            ></v-text-field>
            <v-text-field
              variant="solo"
              density="comfortable"
              v-model="password"
              label="Senha"
              name="password"
              type="password"
              autocomplete="off"
              :rules="[Util.Rules.blankInput]"
              @keydown.space.prevent
            ></v-text-field>
            <v-text-field
              variant="solo"
              density="comfortable"
              v-model="confirmPassword"
              label="Confirmar Senha"
              name="confirmPassword"
              type="password"
              autocomplete="off"
              :rules="[Util.Rules.blankInput]"
              @keydown.space.prevent
            ></v-text-field>
          </v-card-text>
          <v-btn type="submit" variant="elevated" width="100%" color="#3D95D2">
            REDEFINIR
          </v-btn>
        </v-form>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import Util from '@/util';

const email = ref();
const password = ref();
const message = ref();
const color = ref();
const snackbar = ref(false);

const disableBtn = () => {
  const regex = /\S+@\S+\.\S+/;
  const emailValidated = regex.test(email.value);

  if (email.value && emailValidated && password.value && password.value.length > 8) {
    return false;
  }

  return true;
};
</script>

<style scoped>
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/login_background.png');
  background-size: cover;
}

.logo-image {
  width: 50%;
  max-width: 100px;
  margin: 0 auto;
  background-color: white;
  border-radius: 30%;
}

.reset-container {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  max-width: 600px;
  height: 100vh;
  background-color: #2c395e;
}

.reset-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
  padding: 3rem 1rem;
}

@media (max-width: 600px) {
  .reset-container {
    width: 100%;
  }
}
</style>
