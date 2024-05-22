<template>
  <v-app>
    <v-main class="body">
      <HeaderComponent v-if="!isLoginPage" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue';
import router from './router';
import HeaderComponent from '@/components/HeaderComponent.vue';

const isLoginPage = computed(() => router.currentRoute.value.path === '/login');
</script>

<style scoped>
.body {
  background-color: var(--neutral-gray-200);
}
</style>
