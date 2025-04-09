import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Noir from './presets/Noir.js'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import Select from 'primevue/select'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark',
      cssLayer: false,
    },
  },
})
app.component('ActionButton', Button)
app.component('InputText', InputText)
app.component('InlineMessage', Message)
app.component('SelectDropDown', Select)
app.component('ProgressSpinner', ProgressSpinner)

app.mount('#app')
