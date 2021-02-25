<template>
  <ListTabs :unsubscribe="unsubscribe" :returned="returned" :handle-tab-menu="handleTabMenu" />
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
    returned() {
      return this.filter.returned;
    },    
  },
  methods: {
    handleTabMenu(unsubscribe, returned) {
      // $('input[type=text]').each(function() {
      //   $(this).val('');
      // })
      this.$store.dispatch('customers', {
        sort: unsubscribe ? [{ unsubscribe: -1}, { name: 1 }] : [{ date: -1 }, { name: 1 }],
        skip: 0,
        limit: this.$store.state.limit,
        filter: {
          unsubscribe,
          returned        
        }
      });
    },
  }
}
</script>
 
 