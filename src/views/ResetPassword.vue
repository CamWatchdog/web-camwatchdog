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
                  label="Nova Senha"
                  :type="show1 ? 'text' : 'password'"
                  @click:append-inner="show1 = !show1"
                  :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  name="password"
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
                  :type="show2 ? 'text' : 'password'"
                  @click:append-inner="show2 = !show2"
                  :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
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
                :disabled="disable"
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
                :disabled="disable"
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
import router from '@/router';
import Snackbar from '@/components/Snackbar.vue';

const formValidate = ref(false);
const stepper = ref();

const email = ref();
const password = ref();
const confirmPassword = ref();
const codigo = ref();
const show1 = ref(false);
const show2 = ref(false);
const disable = ref(false);

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
      disable.value = true;
      api.Users.generateAndSendNewResetCode(email.value)
        .then((response) => {
          if (response.status >= 200 && response.status <= 300) {
            disable.value = false;
            return stepper.value.next();
          }
        })
        .catch((err) => {
          color.value = 'error';
          message.value = 'Erro ao redefinir senha';
          location.value = 'start top';
          snackbar.value = true;
          disable.value = false;
        });
    }
  }
};

const handleSubmitConfirmationCode = () => {
  if (formValidate.value) {
    disable.value = true;

    api.Users.verifyResetPasswordCode(
      email.value,
      codigo.value,
      password.value,
      confirmPassword.value,
    )
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          color.value = 'success';
          message.value = 'Senha redifinida com sucesso';
          location.value = 'start top';
          snackbar.value = true;

          return setTimeout(() => {
            return router.push({ path: '/login' });
          }, 3000);
        }
      })
      .catch((err) => {
        color.value = 'error';
        message.value = 'Erro ao verificar código';
        location.value = 'start top';
        snackbar.value = true;
        disable.value = false;
      });
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
