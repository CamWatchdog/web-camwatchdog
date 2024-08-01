/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify';
import router from '@/router';
import { vMaska } from 'maska/vue';
import { Chart, registerables } from 'chart.js';

export function registerPlugins(app) {
  app.use(vuetify).use(router).directive('maska', vMaska);
  Chart.register(...registerables);
}
