<template>
  <TheView :unsubsbribe="unsubsbribe" :returned="returned" :customer="customer" :color="color" />
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
    unsubsbribe() {
      return this.$store.state.filter.unsubsbribe;
    },
    returned() {
      return this.$store.state.filter.returned;
    }    
  }
}
</script>