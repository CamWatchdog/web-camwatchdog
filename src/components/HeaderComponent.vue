<template>
  <header class="header">
    <nav class="link-container">
      <router-link to="/" class="link-item">
        <v-img class="logo-link" src="/logo.png" alt="Logo" />
      </router-link>
      <router-link
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        :class="['link-item', currentRoute.includes(link.path) ? 'selected' : '']"
        >{{ link.name }}</router-link
      >
    </nav>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="user" v-bind="props">
          <span>Usuário</span>
          <v-icon icon="mdi-account-circle" color="var(--neutral-white)" />
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="openConfig" link>
          <v-list-item-title>
            <v-icon icon="mdi-cog" />
            Configurações
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="exit" link class="logout-btn">
          <v-list-item-title>
            <v-icon icon="mdi-logout" color="var(--red-500)" />
            Sair
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </header>
  <UserConfigModal v-model="showConfigModal" />
</template>
<script setup>
import router from '@/router';
import { computed, ref } from 'vue';

import UserConfigModal from '@/views/UserConfigModal.vue';

const currentRoute = computed(() => router.currentRoute.value.path);
const links = computed(() => [
  { name: 'Ocorrências', path: '/occurrences' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Monitoramento', path: '/computers' },
  { name: 'Usuários', path: '/users' },
]);

const showConfigModal = ref(false);

const openConfig = () => {
  showConfigModal.value = true;
};

const exit = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return router.push({ path: '/login' });
};
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background: var(--blue-700);
}

.link-container {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.link-item {
  color: var(--neutral-white);
  padding: 0.5rem;
  text-decoration: none;
  border-radius: 4px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  transition: ease-in 100ms;
}

.logo-link {
  width: 5rem;
  background: var(--neutral-white);
  border-radius: 30%;
}

.link-item.selected {
  border-bottom-color: var(--blue-500);
}

.link-item:hover {
  background: var(--blue-900);
}

.user {
  display: flex;
  gap: 1rem;
  align-items: center;
  color: var(--neutral-white);
  background: none;
  box-shadow: none;
}

.logout-btn {
  color: var(--red-500);
}
</style>
