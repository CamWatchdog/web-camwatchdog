<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h2>Dashboard</h2>
    </div>
    <v-row dense class="align-end">
      <v-col cols="3">
        <span>Computadores</span>
        <v-select
          v-model="computerIdList"
          :items="computerList"
          class="search-user"
          density="comfortable"
          variant="solo"
          multiple
          @update:model-value="getData"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index < 3">
              <span class="chip-computer">{{ item.title }}</span>
            </v-chip>
            <span v-if="index === 3" class="text-grey text-caption align-self-center">
              +{{ computerIdList.length - 3 }} outros
            </span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="2">
        <span>Data Início</span>
        <v-date-input
          v-model="startTime"
          variant="solo"
          prepend-icon=""
          prepend-inner-icon="$calendar"
          placeholder="DD/MM/AAAA"
        />
      </v-col>
      <v-col cols="2">
        <span>Data Final</span>
        <v-date-input
          v-model="endTime"
          variant="solo"
          prepend-icon=""
          prepend-inner-icon="$calendar"
          placeholder="DD/MM/AAAA"
        />
      </v-col>
    </v-row>
    <LineChart :chartData="chartData" />
    <v-row class="mt-3">
      <v-col>
        <v-card title="Total de Ocorrências">
          <div class="dashboard-total">
            {{ total.toLocaleString('pt-BR') }}
            Ocorrência{{ total == 1 ? '' : 's' }}
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card title="Média de Ocorrências">
          <div class="dashboard-total">
            {{ avarage.toLocaleString('pt-BR') }}
            Ocorrência{{ avarage == 1 ? '' : 's' }} por {{ avarageType }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import api from '@/api/';
import { computed, onMounted, ref, watch } from 'vue';
import { LineChart } from 'vue-chart-3';

const today = new Date();
const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);

const labels = ref([]);
const value = ref([]);
const loading = ref(false);
const startTime = ref(lastMonth);
const endTime = ref(today);
const type = ref('');
const computerIdList = ref([]);
const computerList = ref([]);

const total = computed(() => {
  return value.value.reduce((acc, cur) => acc + cur, 0);
});

const avarage = computed(() => {
  return total.value / value.value.length;
});

const avarageType = computed(() => {
  return type.value === 'day' ? 'dia' : type.value === 'month' ? 'mês' : 'ano';
});

const chartData = computed(() => {
  return {
    labels: labels.value,
    datasets: [
      {
        label: 'Quantidade de Ocorrência',
        data: value.value,
        borderColor: '#D23A1D',
        backgroundColor: 'rgba(210, 58, 29, 0.5)',
      },
    ],
  };
});

const getData = () => {
  loading.value = true;
  const startDate = new Date(startTime.value).getTime();
  const endDate = new Date(endTime.value).getTime();
  api.Dashboard.period(startDate, endDate, computerIdList.value).then((response) => {
    loading.value = false;
    labels.value = response.data.labels;
    value.value = response.data.value;
    type.value = response.data.type;
  });
};

const getComputerList = () => {
  api.Computer.findMapped().then((response) => {
    computerList.value = response.data.map((computer, index) => ({
      title: computer.description,
      value: computer.computerId,
      index,
    }));
  });
};

watch([startTime, endTime], () => {
  getData();
});

onMounted(() => {
  getData();
  getComputerList();
});
</script>
<style scoped>
.dashboard {
  padding: 1rem;
}

.dashboard-total {
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
}

.chip-computer {
  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  max-width: 5rem;
}
</style>
<style>
.dashboard .search-user .v-field {
  padding: 0.25rem;
}

.dashboard .search-user .v-field__input {
  padding: 0 !important;
  padding-left: 1rem !important;
}
</style>
