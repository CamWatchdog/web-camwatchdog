<template>
  <v-container class="pa-0" fluid fill-height>
    <div class="background-image"></div>
    <div class="reset-container">
      <v-container>
        <v-img class="logo-image" src="/logo.png" alt="Logo"></v-img>
      </v-container>
    </div>
  </v-container>
</template>

<script setup></script>

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

@media (max-width: 600px) {
  .login-container {
    width: 100%;
  }
}
</style>
