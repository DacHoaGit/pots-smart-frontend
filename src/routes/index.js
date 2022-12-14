import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user-store'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import ("../views/HomeView.vue"),
        children:[
          {
            path: '/login',
            name: 'login',
            beforeEnter: (to, from, next) => {
              useUserStore().id ? next('/dashboard') : next()
            },
            component: () => import ("../components/Home/Login.vue")
          },
    
          {
            path: '/register',
            name: 'register',
            beforeEnter: (to, from, next) => {
              useUserStore().id ? next('/dashboard') : next()
            },
            component: () => import ("../components/Home/Register.vue")
          },
        ]
    },

    {
        path: '/dashboard',
        name: 'dashboard',
        beforeEnter: (to, from, next) => {
          useUserStore().id ? next() : next('/login')
        },
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
          {
            path:'/control',
            name:'control',
            component: () => import ("../components/Dashboard/Control.vue"),
          },
          {
            path:'/shareconfig',
            name:'shareconfig',
            component: () => import ("../components/Dashboard/ShareConfig.vue"),
          },
          {
            path:'/timer',
            name:'timer',
            component: () => import ("../components/Dashboard/Timer.vue"),
          },
          {
            path:'/token',
            name:'token_pots',
            component: () => import ("../components/Dashboard/TokenPots.vue"),
          },
        ]
    },
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router