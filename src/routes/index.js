import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import ("../views/HomeView.vue")
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import ("../views/Dashboard.vue"),
        children:[
          {
            path:'/tinh-toan-phan-bon',
            name:'FertilizerCalculator',
            component: () => import ("../components/Dashboard/FertilizerCalculator.vue"),
          },
          {
            path:'/dashboard',
            name:'Overview',
            component: () => import ("../components/Dashboard/Overview.vue"),
          },
        ]
    },
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router