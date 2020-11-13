import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/bmr-calculator',
    component: () => import('../views/BMRCalculator.vue'),
  },
  {
    path: '/tdee-calculator',
    component: () => import('../views/TDEECalculator.vue'),
  },
  {
    path: '/wilks-calculator',
    component: () => import('../views/WilksCalculator.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
