import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue'
import {router} from '@/router'

import PageHeader from './components/PageHeader.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.component('PageHeader', PageHeader)
app.mount('#app')

