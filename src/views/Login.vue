<template>
  <v-container class="pa-0" fluid fill-height>
    <div class="background-image"></div>
    <Snackbar v-model="snackbar" :message="message" :color="color" />
    <div class="login-container">
      <v-container>
        <v-img class="logo-image" src="/logo.png" alt="Logo"></v-img>
      </v-container>
      <v-card class="login-card" rounded="0" color="#1B2440">
        <v-card-title class="text-center">Login</v-card-title>
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
          </v-card-text>
          <v-btn
            type="submit"
            variant="elevated"
            width="100%"
            color="#3D95D2"
            :disabled="disableBtn()"
          >
            Entrar
          </v-btn>
        </v-form>
        <v-divider></v-divider>
        <v-card-text class="d-flex align-center justify-center pa-0">
          <router-link
            style="text-decoration: none; color: inherit"
            to="/resetPassword"
            class="cursor-pointer"
          >
            Esqueceu sua senha?
          </router-link>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

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

.login-container {
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

.login-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
  padding: 2rem 1rem;
}

@media (max-width: 600px) {
  .login-container {
    width: 100%;
  }
}
</style>

<script setup>
import { ref } from 'vue';
import api from '@/api';
import router from '@/router';
import Snackbar from '@/components/Snackbar.vue';
import Util from '@/util';

const email = ref();
const password = ref();
const message = ref();
const color = ref();
const snackbar = ref(false);

const handleSubmit = (e) => {
  e.preventDefault();

  api
    .login(email.value, password.value)
    .then((response) => {
      if (response.status >= 200 && response.status <= 300) {
        return router.push({ path: '/occurrences' });
      }
    })
    .catch((err) => {
      color.value = 'error';
      snackbar.value = true;
      message.value = 'Erro ao autenticar, tente novamente!';
    });
};

const disableBtn = () => {
  const regex = /\S+@\S+\.\S+/;
  const emailValidated = regex.test(email.value);

  if (email.value && emailValidated && password.value && password.value.length > 8) {
    return false;
  }

  return true;
};
</script>
