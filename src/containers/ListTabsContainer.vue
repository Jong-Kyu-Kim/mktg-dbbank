<template>
  <ListTabs :unsubscribe="unsubscribe" :exist="exist" :handle-tab-menu="handleTabMenu" />
</template>

<script>
import ListTabs from 'components/ListTabs';

export default {
  components: {
    ListTabs
  },
  computed: {
    state() {
      return this.$store.state;
    },    
    filter() {
      return this.state.filter
    },    
    unsubscribe() {
      return this.filter.unsubscribe;
    },
    exist() {
      return this.filter.exist;
    },    
  },
  methods: {
    handleTabMenu(unsubscribe, exist) {
      // $('input[type=text]').each(function() {
      //   $(this).val('');
      // })
      this.$store.dispatch('customers', {
        sort: unsubscribe ? [{ unsubscribe: -1}, { name: 1 }] : [{ date: -1 }, { name: 1 }],
        skip: 0,
        limit: this.$store.state.limit,
        filter: {
          unsubscribe,
          exist        
        }
      });
    },
  }
}
</script>
 
 