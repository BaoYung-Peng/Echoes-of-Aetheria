import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Gameplay from '../views/Gameplay.vue';
import TheWorldView from '../views/TheWorldView.vue';
import DimensionalSwitchView from '../views/DimensionalSwitchView.vue';
import Gameplan from '../views/Gameplan.vue';
import Role from '../SSR/Role.vue'; 
import Simulation from '../views/Simulation.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/gameplay', component: Gameplay },
    { path: '/theWorldView', component: TheWorldView },
    { path: '/dimension-switch', name: 'DimensionalSwitch', component: DimensionalSwitchView },
    { path: '/gameplan', name: 'Gameplan', component: Gameplan },
    { path: '/ssr/role', name: 'Role', component: Role },
    { path: '/simulation', name:'Simulation', component: Simulation },
  ]
});

router.afterEach((to) => {
  const windowAny = window as any;
  
  if (typeof windowAny.gtag === 'function') {
    windowAny.gtag('config', 'G-55GSH1HCD9', {
      page_path: to.path,
      page_title: to.name ? String(to.name) : to.path,
    });
  }
});
// -----------------------
export default router;
