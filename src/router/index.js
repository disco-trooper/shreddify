import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/bmr-calculator',
    component: () => import('../views/BMRCalculator.vue'),
  },
  {
    path: '/tdee-calculator',
    component: () => import('../views/TDEECalculator.vue'),
  },
  {
    path: '/macro-calculator',
    component: () => import('../views/MacroCalculator.vue'),
  },
  {
    path: '/wilks-calculator',
    component: () => import('../views/WilksCalculator.vue'),
  },
  {
    path: '/1rm-calculator',
    component: () => import('../views/1RMCalculator.vue'),
  },
  {
    path: '/bmi-calculator',
    component: () => import('../views/BMICalculator.vue'),
  },
  {
    path: '/ffmi-calculator',
    component: () => import('../views/FFMICalculator.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
