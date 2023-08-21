import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'

import { router } from './router/router.js'

import App from './App.vue'

import './assets/css/style.css'
import 'ant-design-vue/dist/reset.css'
import './assets/css/antd.css'

const app = createApp(App)

app.use(router)
app.use(Antd)
app.use(createPinia())
app.mount('#app')
