import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routes'
import 'ant-design-vue/dist/antd.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import './axios.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Button,Drawer, List, Menu,Progress, Card,Divider,Upload,Table ,Tooltip, Avatar,Image, Input, Form, Select } from 'ant-design-vue';
import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js';

// window.axios = axios;




const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(VueChartkick)

app.use(pinia)
app.use(router)
app.use(Button)
app.use(Tooltip)
app.use(Upload)
app.use(Table)
app.use(Divider)
app.use(Select)
app.use(Progress)
app.use(Form)
app.use(Input)
app.use(Drawer)
app.use(List)
app.use(Image)
app.use(Card)
app.use(Avatar)
app.use(Menu)

app.mount('#app')
