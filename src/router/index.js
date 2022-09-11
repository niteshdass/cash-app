import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '../components/home/index.vue'
import Transaction from '../components/transections/index.vue'
import Borrower from '../components/borrower/index.vue'
import Budget from '../components/budgets/index.vue'
import Settings from '../components/settings/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/transactions',
    name: 'transactions',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Transaction
  },
  {
    path: '/borrower',
    name: 'borrower',
    component: Borrower
  },
  {
    path: '/budgets',
    name: 'budgets',
    component: Budget
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
