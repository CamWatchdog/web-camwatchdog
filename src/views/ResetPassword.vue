<template>
  <v-container class="d-flex justify-end pa-0" fluid fill-height>
    <div class="background-image"></div>
    <Snackbar v-model="snackbar" :message="message" :color="color" :location="location" />
    <div class="reset-container">
      <v-container>
        <v-img class="logo-image" src="/logo.png" alt="Logo"></v-img>
      </v-container>
      <v-stepper
        :items="['Redefinir Senha', 'Confirmar Código']"
        bg-color="var(--blue-900)"
        rounded="0"
        class="reset-cards pa-0"
        ref="stepper"
        hide-actions
        alt-labels
        mobile
      >
        <template v-slot:item.1>
          <v-card class="card" rounded="0">
            <v-card-title class="text-center">Redefinir Senha</v-card-title>
            <v-form v-model="formValidate" @submit.prevent>
              <v-card-text class="pl-0 pr-0 pt-0">
                <v-text-field
                  variant="solo"
                  density="comfortable"
                  v-model="email"
                  label="Email"
                  :rules="[Util.Rules.required, Util.Rules.email]"
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
                  :rules="[
                    Util.Rules.required,
                    Util.Rules.passwordMinChar,
                    Util.Rules.passwordHasSpecialChar,
                  ]"
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
                  :rules="[
                    Util.Rules.required,
                    Util.Rules.passwordMinChar,
                    Util.Rules.passwordHasSpecialChar,
                  ]"
                  @keydown.space.prevent
                ></v-text-field>
              </v-card-text>
              <v-btn
                type="submit"
                variant="elevated"
                width="100%"
                @click="handleSubmitRedefinePassword"
                color="#3d95d2"
              >
                PRÓXIMO
              </v-btn>
            </v-form>
          </v-card>
        </template>
        <template v-slot:item.2>
          <v-card class="card" rounded="0">
            <v-card-title class="text-center">Confirmar Código</v-card-title>
            <div>Insira abaixo o código de confirmação que foi enviado para o seu e-mail.</div>
            <v-form @submit.prevent v-model="formValidate">
              <v-card-text class="pl-0 pr-0 pt-0">
                <v-text-field
                  variant="solo"
                  density="comfortable"
                  v-model="codigo"
                  label="Código"
                  :rules="[Util.Rules.required]"
                  @keydown.space.prevent
                ></v-text-field>
              </v-card-text>
              <v-btn
                type="submit"
                variant="elevated"
                width="100%"
                color="#3d95d2"
                @click="handleSubmitConfirmationCode"
              >
                CONFIRMAR
              </v-btn>
            </v-form>
          </v-card>
        </template>
      </v-stepper>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import Util from '@/util';
import api from '@/api';
import Snackbar from '@/components/Snackbar.vue';

const formValidate = ref(false);
const stepper = ref();

const email = ref();
const password = ref();
const confirmPassword = ref();
const codigo = ref();

const location = ref();
const message = ref();
const color = ref();
const snackbar = ref(false);

const handleSubmitRedefinePassword = () => {
  if (formValidate.value) {
    if (password.value !== confirmPassword.value) {
      message.value = 'Senhas não se conferem';
      location.value = 'start top';
      color.value = 'error';
      snackbar.value = true;
    } else {
      stepper.value.next();
    }
  }
};

const handleSubmitConfirmationCode = () => {
  if (formValidate.value) {
  }
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
  background-color: var(--blue-700);
}

.reset-cards {
  display: flex;
  color: white;
  flex-direction: column;
  max-height: 100%;
  width: 80%;
  padding: 3rem 1rem;
}

.card {
  display: flex;
  color: white;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  gap: 20px;
  background-color: transparent;
}

@media (max-width: 600px) {
  .reset-container {
    width: 100%;
  }
}
</style>
