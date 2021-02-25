<template>
  <ListCount :count="count" />
</template>

<script>
import ListCount from 'components/ListCount';

export default {
  components: {
    ListCount
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
}
</script>