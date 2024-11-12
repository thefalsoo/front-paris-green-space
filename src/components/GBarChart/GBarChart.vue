<script setup lang="ts">
import { ref, onMounted, defineProps, watch, type PropType } from 'vue'
import Chart from 'primevue/chart'

const props = defineProps({
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
})

const chartData = ref()
const chartOptions = ref()

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)

  return {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor:
          props.colors.length > 0
            ? props.colors
            : [
                documentStyle.getPropertyValue('--p-cyan-500'),
                documentStyle.getPropertyValue('--p-orange-500'),
                documentStyle.getPropertyValue('--p-gray-500'),
              ],
        hoverBackgroundColor:
          props.colors.length > 0
            ? props.colors.map((color) => color.replace('500', '400'))
            : [
                documentStyle.getPropertyValue('--p-cyan-400'),
                documentStyle.getPropertyValue('--p-orange-400'),
                documentStyle.getPropertyValue('--p-gray-400'),
              ],
      },
    ],
  }
}

const setChartOptions = () => {
  return {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
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
  <Chart type="bar" :data="chartData" :options="chartOptions" />
</template>
