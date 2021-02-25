<template>
  <TheList :unsubscribe="unsubscribe" :returned="returned" />
</template>

<script>
import TheList from 'components/TheList';

export default {
  components: {
    TheList
  },
  computed: {
    unsubscribe() {
      return this.$store.state.filter.unsubscribe;
    },
    returned() {
      return this.$store.state.filter.returned;
    }    
  }
}
</script>