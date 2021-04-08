<template>
  <Sidebar :handle-menu="handleMenu" />
</template>

<script>
import Sidebar from 'components/TheSidebar';

export default {
  components: {
    Sidebar
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
    handleMenu(unsubscribe, returned) {
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
      }).then(() => {
        if (this.$router.currentRoute.name !== 'List') {
          this.$router.push({ name: 'List' })
        }
      });
    },
  },
}
</script>
 
 