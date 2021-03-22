<template>
  <TheView :unsubscribe="unsubscribe" :returned="returned" :customer="customer" :color="color" />
</template>

<script>
import TheView from 'components/TheView';

export default {
  components: {
    TheView
  },
  props: {
    customer: {
      type: Object,
      default() {}
    },
    color: {
      type: String,
      default: ''
    }
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