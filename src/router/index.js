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

  if (!hasToken && to.path !== '/login' && to.path !== '/resetPassword') {
    next({ path: '/login' });
  } else if (
    (hasToken && (to.path === '/login' || to.path === '/resetPassword')) ||
    !router.hasRoute(to.name)
  ) {
    next({ path: '/occurrences' });
  } else {
    next();
  }
});

export default router;
