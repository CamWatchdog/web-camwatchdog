<template>
  <v-container class="container-occurrences pa-5" fluid fill-height>
    <h1>Ocorrências</h1>
    <v-row dense>
      <v-col cols="auto">
        <span>Buscar</span>
        <v-text-field
          class="search-user"
          density="comfortable"
          label="Usuário"
          variant="solo"
          v-model="user"
          hide-details
          single-line
          @keydown.space.prevent
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <span>Data Início</span>
        <v-text-field
          class="search-dates"
          type="datetime-local"
          density="comfortable"
          v-model="date_initial"
          variant="solo"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <span>Data Final</span>
        <v-text-field
          class="search-dates"
          density="comfortable"
          type="datetime-local"
          v-model="date_final"
          variant="solo"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn class="text-white text-capitalize mb-5" height="50" width="100" color="var(--blue-900)"
      >Filtrar</v-btn
    >
    <div class="filters mb-5">
      <div class="filters-title">
        <v-icon icon="mdi-filter-variant" size="large" />
        <span>Filtros</span>
      </div>
      <div class="filtered">
        <v-chip class="chip" size="small" variant="flat" color="var(--neutral-black)" closable
          >Usuário
        </v-chip>
        <v-chip class="chip" size="small" variant="flat" color="var(--neutral-black)" closable
          >Data Início</v-chip
        >
        <v-chip class="chip" size="small" variant="flat" color="var(--neutral-black)" closable
          >Data Final</v-chip
        >
      </div>
    </div>
    <div class="list">
      <v-expansion-panels flat>
        <v-expansion-panel style="border: 1px solid var(--warn-500)" bg-color="var(--warn-100)">
          <v-expansion-panel-title>
            <template #actions>
              <v-icon color="var(--warn-500)">$expand</v-icon>
            </template>
            <v-icon icon="mdi-shield-alert-outline" color="var(--warn-500)" />
            <div class="infos">
              <div>11 de fevereiro de 2024 23:59</div>
              <div>Usuário: Pedro</div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="images">
              <div><a class="cursor-pointer text-decoration-underline">Imagem da Tela</a></div>
              <div><a class="cursor-pointer text-decoration-underline">Imagem da Câmera</a></div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-container>
      <v-row justify="center">
        <v-col cols="5">
          <v-container class="max-width">
            <v-pagination v-model="page" :length="15"></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
.search-user {
  width: 450px;
  max-width: 100%;
}

.search-dates {
  width: 220px;
  max-width: 100%;
}

.filters {
  display: flex;
  flex-direction: column;
}

.filters-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filtered {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.chip {
  cursor: pointer;
  vertical-align: middle;
}

.list {
  display: flex;
  width: 100%;
  gap: 1rem;
  flex-direction: column;
}

.infos {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--warn-500);
  margin-left: 1rem;
}

.images {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--warn-500);
}
</style>

<script setup>
const occurences = [
  { id: 1, title: 'Occurence 1' },
  { id: 2, title: 'Occurence 2' },
  { id: 3, title: 'Occurence 3' },
];
</script>
