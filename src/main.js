import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routes'
import 'ant-design-vue/dist/antd.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import './axios.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Button,Drawer, List, Menu, Card, Table, InputPassword, Avatar,Image, Input, Form, Select } from 'ant-design-vue';
// window.axios = axios;

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)


app.use(pinia)
app.use(router)
app.use(Button)
app.use(Select)
app.use(Form)
app.use(Input)
app.use(Drawer)
app.use(List)
app.use(Image)
app.use(Card)
app.use(Avatar)
app.use(Table)
app.use(Menu)

app.mount('#app')
