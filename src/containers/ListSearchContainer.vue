<template>
  <ListSearch
    :handle-global-history="handleGlobalHistory"
    :history="history"
    :handle-global-search="handleGlobalSearch"
    :keyword="keyword"    
  />
</template>

<script>
import ListSearch from 'components/ListSearch';

export default {
  components: {
    ListSearch
  },
  data() {
    return {
      history: this.$store.state.filter.history ? this.$store.state.filter.history : false,
      keyword: this.$store.state.filter.keyword ? this.$store.state.filter.keyword : '',
    }
  },
  computed: {
    returned() {
      return this.$store.state.filter.returned;
    },
    unsubscribe() {
      return this.$store.state.filter.unsubscribe;
    }
  },
  watch: {
    returned() {
      this.setInitData();
    },    
    unsubscribe() {
      this.setInitData();
    }
  },  
  methods: {
    setInitData() {
      this.history = false;
      this.keyword = '';
      $('input[type=text].search.global').val('');
    },
    handleGlobalHistory(e) {
      const history = e.currentTarget.checked;
      this.history = history;
      
      const { $store, keyword } = this;

      $store.dispatch('customers', {
        history,
        skip: 0,
        limit: $store.state.limit,
        filter: { keyword, history }
      });
    },
    handleGlobalSearch(e) {
      e.preventDefault();
      const keyword = e.currentTarget.value;
      this.keyword = keyword;

      const { $store, history } = this;

      $store.dispatch('customers', {
        history,
        skip: 0,
        limit: $store.state.limit,
        filter: { keyword, history }
      });
    },
  },
}
</script>