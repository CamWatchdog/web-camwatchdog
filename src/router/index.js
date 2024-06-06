/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';

const router = createRouter({
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const hasToken = localStorage.getItem('token');

  if (!hasToken && to.path !== '/login') {
    next({ path: '/login' });
  } else if (hasToken && to.path === '/login') {
    next({ path: '/occurrences' });
  } else {
    next();
  }
});

export default router;
