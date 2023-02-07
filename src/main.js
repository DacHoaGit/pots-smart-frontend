import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routes'
import 'ant-design-vue/dist/antd.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import './axios.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Button,Drawer,Tabs,Tag, List,Space,Carousel,Col, Menu,Progress, Card,Divider,Upload,TimePicker,Switch,DatePicker, Table, Rate ,Tooltip, Avatar,Image, Input, Form, Select,SelectOptGroup, SelectOption } from 'ant-design-vue';
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
app.use(Tabs)
app.use(Tag)
app.use(Carousel)
app.use(Rate)
app.use(TimePicker)
app.use(DatePicker)
app.use(Switch)
app.use(Tooltip)
app.use(Col)
app.use(Upload)
app.use(Space)
app.use(Table)
app.use(Divider)
app.use(Select)
app.use(SelectOptGroup)
app.use(SelectOption)
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
