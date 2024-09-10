import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';  // Example component

const routes = [
  { path: '/', component: App },
];

const router = createRouter({
  history: createWebHistory(),  // Enable history mode for pretty URLs without hash
  routes
});

export default router;
