import Vue from 'vue';
import VueRouter from 'vue-router';

const router = new VueRouter({
  mode: 'history',
  routes: [    
    { path: '/dbbank', component: () => import('../components/TheList'), name: 'List' },
    { path: '/dbbank', component: () => import('../components/TheView'), name: 'View', props: true },
  ]
});

Vue.use(VueRouter);

export default router;