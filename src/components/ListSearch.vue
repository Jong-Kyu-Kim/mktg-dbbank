<template>
  <v-flex>
    <v-checkbox :id="'history'" :label="'이력검색'" :checked="history" :change="handleGlobalHistory" />
    <v-input type="text" class="search global" :value="keyword" placeholder="검색어를 입력하세요." :keyup="handleGlobalSearch" />
  </v-flex>   
</template>

<script>
import { VFlex, VCheckbox, VInput } from './ui';

export default {
  components: {
    VFlex, VCheckbox, VInput
  },
  props: {
    handleGlobalHistory: {
      type: Function,
      default() {}
    },
    history: {
      type: Boolean,
      default: false
    },
    handleGlobalSearch: {
      type: Function,
      default() {}
    },
    keyword: {
      type: String,
      default: ''
    }
  }
}
</script>