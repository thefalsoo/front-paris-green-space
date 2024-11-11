<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GMap from '@/components/GMap/GMap.vue'
import { getTrees } from '@/services/overpassService'
import { OverpassElementType, type OverpassResponse } from '@/types/overpassResponse'
import type { FeatureCollection } from 'geojson'
import { formatTreesToGeoJson } from '@/utils/formatOverpass'

const overpassResponse = ref<OverpassResponse | null>(null)
const geoJson = ref<FeatureCollection | null>(null)
onMounted(async () => {
  try {
    const data = await getTrees()
    console.log('data', data)

    overpassResponse.value = data
    const OverpassResponseToGeoJson = formatTreesToGeoJson(overpassResponse.value)
    console.log('OverpassResponseToGeoJson', OverpassResponseToGeoJson)

    geoJson.value = OverpassResponseToGeoJson
  } catch (error) {
    console.error('Erreur lors de la récupération des espaces verts :', error)
  }
})
</script>

<template>
  <main>
    <div>
      <GMap :geoJsonData="geoJson" :overpassElementType="OverpassElementType.NODE" />
    </div>
  </main>
</template>
