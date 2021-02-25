import Vue from 'vue';
import store from './store';
import router from './router';
import apolloProvider from './apollo';
import App from './App';

new Vue({
  el: '#app',
  store,
  router,
  apolloProvider,
  render: h => h(App)
});