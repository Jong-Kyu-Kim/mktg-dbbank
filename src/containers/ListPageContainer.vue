<template>
  <ListPagination :current-page="currentPage" :total-pages="totalPages" :click="handlePage" />
</template>

<script>
import ListPagination from 'components/ListPagination';

export default {
  components: {
    ListPagination
  },
  computed: {
    count() {
      return this.$store.state.count;
    },    
    currentPage() {
      const { skip, limit } = this.$store.state;
      return skip / limit;
    },
    totalPages() {
      return Math.ceil(this.count / this.$store.state.limit);
    },    
  },
  methods: {
    handlePage(e) {
      const { limit } = this.$store.state;
      this.$store.dispatch('customers', {
        skip: limit * parseInt(e.currentTarget.name),
        limit
      });
    },    
  }
}
</script>