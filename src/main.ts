import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/main.css'

// Initialize theme before mounting to prevent flash
const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
document.documentElement.setAttribute('data-theme', initialTheme)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
