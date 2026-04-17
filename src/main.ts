import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
// Plugins
import { registerPlugins } from '@/plugins';

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  const app = createApp(App);
  registerPlugins(app);
  app.mount('#app');
});
