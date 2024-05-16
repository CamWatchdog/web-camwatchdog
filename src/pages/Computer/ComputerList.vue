<template>
  <div class="occurence-list">
    <h2>Monitoramento</h2>
    <div class="filter">
      <div class="search"></div>
      <div class="start-time"></div>
      <div class="end-time"></div>
    </div>
    <div class="list">
      <div class="list-item">
        <v-icon icon="mdi-laptop" color="var(--blue-500)" />
        <div class="list-item-info">
          <div class="date">11 de fevereiro de 2024 23:59</div>
          <div class="user">Computador: Pedro</div>
        </div>
        <div class="actions">
          <v-btn variant="text" icon="mdi-pencil-outline" color="var(--blue-500)" />
          <v-btn variant="text" icon="mdi-trash-can-outline" color="var(--blue-500)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const occurences = [
  { id: 1, title: 'Occurence 1' },
  { id: 2, title: 'Occurence 2' },
  { id: 3, title: 'Occurence 3' },
];
</script>
<style scoped>
.list {
  display: flex;
  width: 100%;
  gap: 1rem;
  flex-direction: column;
}

.list-item {
  align-items: center;
  display: flex;
  gap: 1rem;
  width: 100%;
  border: 1px solid var(--blue-500);
  padding: 1rem;
  background-color: var(--blue-100);
  color: var(--blue-500);
  border-radius: 4px;
}

.list-item-info {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.actions {
  display: flex;
}
</style>
