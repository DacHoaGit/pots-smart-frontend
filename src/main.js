import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routes'
import 'ant-design-vue/dist/antd.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import { Button,Drawer, List, Menu, Card, Table, Avatar,Image } from 'ant-design-vue';
// window.axios = axios;

const pinia = createPinia()
const app = createApp(App)


app.use(pinia)
app.use(router)
app.use(Button)
app.use(Drawer)
app.use(List)
app.use(Image)
app.use(Card)
app.use(Avatar)
app.use(Table)
app.use(Menu)

app.mount('#app')
