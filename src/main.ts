import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import router from './router/router'

import './assets/main.css'
import 'leaflet/dist/leaflet.css'

import Tooltip from 'primevue/tooltip'

import { i18n } from './i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(i18n)
app.directive('tooltip', Tooltip)
app.mount('#app')
