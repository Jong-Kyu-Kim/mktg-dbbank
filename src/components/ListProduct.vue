<template>
  <v-flex class="start">  
    <v-checkbox
      v-for="({ name, value }, i) in notes"
      :id="name"
      :key="i"
      :checked="filter.note && filter.note.keyword.indexOf(value.replace(/, /gi, '|').replace(/,/gi, '|')) >= 0"
      :change="handleChange"
      :label="name"
    />
    <a v-if="user.dept === 'GS사업팀'" href="" @click.prevent="$router.push({ name: 'Settings', params: { notes } })">
      <span>Settings</span>
    </a>    
  </v-flex>
</template>

<script>
import { VFlex, VCheckbox } from './ui';

export default {
  components: {
    VFlex, VCheckbox
  },
  props: {
    notes: {
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
    },
    user: {
      type: Object,
      default() {}      
    }
  },
}
</script>
<style lang="scss" scoped>
  a {
    &::before {
      content: '';
      position: relative;
      display: inline-block;
      margin-left: 5px;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      opacity: .7;
      background: url(~svg/ico_cog.svg) no-repeat;
    }
    span {
      font-size: 0;
    }
  }
</style>