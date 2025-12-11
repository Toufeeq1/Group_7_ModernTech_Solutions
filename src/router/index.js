import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PayrollView from '@/views/PayrollView.vue'
import EmployeeView from '@/views/EmployeeView.vue'
import PerformaceView from '@/views/PerformaceView.vue'
import ReportView from '../views/ReportVIew.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/Payroll',
      name: 'Payroll',
      component: PayrollView,
    },
     {
      path: '/Employees',
      name: 'Employees',
      component: EmployeeView,
    },
    {
      path: '/Performace',
      name: 'Performace',
      component: PerformaceView,
    },
    {
      path: '/Reports',
      name: 'Reports',
      component: ReportView,
    }
  ],
})

export default router
