import Vue from 'vue';
import Vuex from 'vuex';
//import moment from 'moment';
import customers from './actions/customers';
import targetItems from './actions/targetItems';
import settings from './actions/settings';

Vue.use(Vuex);

const getTwoDigit = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const initialFilter = {
  history: false,
  keyword: '',
  date: {
    history: false,
    fromDate: '2011-01-01',
    //toDate: moment(new Date()).format('YYYY-MM-DD'),
    toDate: `${new Date().getFullYear()}-${getTwoDigit(new Date().getMonth() + 1)}-${getTwoDigit(new Date().getDate())}`,
  },
  unsubscribe: false,
  returned: false,
};

const store = new Vuex.Store({
  state: {
    user: null,
    filter: initialFilter,
    skip: 0,
    limit: 40,
    count: 0,
    items: [],
    sort: [{ date: -1 }, { name: 1 }],
  },
  mutations: {
    // setState(state, payload) {
    //   console.log({
    //     ...state,
    //     ...payload
    //   })
    //   state = {
    //     ...state,
    //     ...payload
    //   }
    // },
    setUser(state, payload) {
      state.user = payload;
    },
    setSort(state, payload) {
      state.sort = payload;
    },
    setCount(state, payload) {
      state.count = payload;
    },
    setSkip(state, payload) {
      state.skip = payload;
    },
    setItems(state, payload) {
      state.items = payload;
    },
    setFilter(state, payload) {
      state.filter = payload;
      // state.filter = {
      //   ...state.filter,
      //   ...payload
      // }
    },
  },
  actions: {
    customers,
    targetItems,
    settings,
  },
});

export default store;
