<script setup lang="ts">
import { defineProps, onMounted, ref, watch, type PropType } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import Chart from 'primevue/chart'
import ProgressSpinner from 'primevue/progressspinner'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  labels: {
    type: Array as PropType<string[]>,
    required: true,
  },
  data: {
    type: Array as PropType<number[]>,
    required: true,
  },
  colors: {
    type: Array as PropType<string[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const chartData = ref()
const chartOptions = ref()

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

const setChartData = () => {
  return {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: props.colors,
      },
    ],
  }
}
const setChartOptions = () => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  }
}

watch(
  () => [props.labels, props.data, props.colors],
  () => {
    chartData.value = setChartData()
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex flex-col bg-grayish rounded-md p-2 h-full w-full">
    <p class="text-white font-bold pb-2">{{ props.title }}</p>
    <div v-if="props.loading" class="flex items-center justify-center h-full w-full">
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="8"
        fill="transparent"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner"
      />
    </div>
    <div v-else class="h-full w-full">
      <Chart type="doughnut" :data="chartData" :options="chartOptions" class="h-full w-full" />
    </div>
  </div>
</template>

<style scoped></style>
