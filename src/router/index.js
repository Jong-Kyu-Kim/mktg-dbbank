import Vue from 'vue';
import VueRouter from 'vue-router';

const router = new VueRouter({
  mode: 'history',
  routes: [    
    { path: '/dbbank', component: () => import('../containers/ListContainer'), name: 'List' },
    { path: '/dbbank', component: () => import('../containers/ViewContainer'), name: 'View', props: true },
  ]
});

Vue.use(VueRouter);

export default router;