<template>
  <v-flex class="start">  
    <v-checkbox
      v-for="({ _id, keyword }, i) in products"
      :id="_id"
      :key="i"
      :checked="filter.note && filter.note.keyword.indexOf(keyword) >= 0"
      :change="handleChange"
      :label="_id"
    />
  </v-flex>
</template>

<script>
import { VFlex, VCheckbox } from './ui';

export default {
  components: {
    VFlex, VCheckbox
  },
  props: {
    products: {
      type: Array,
      default() {}
    },
    handleChange: {
      type: Function,
      default() {}
    },
    filter: {
      type: Object,
      default() {}
    }
  },
}
</script>

<style lang="scss" scoped>

</style>