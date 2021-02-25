<template>
  <div>
    <!-- <v-checkbox
      :id="target + i"
      :checked="isChecked(item._id)"
      :change="handleChecked"
      :label="item._id"
    /> -->    
    <div class="caret" :class="{expanded: expanded}">
      <button @click="click">
        <span>{{ label }}</span>
      </button>
    </div>
    <ul>
      <li v-for="(item, i) in items" :key="item._id">
        <v-checkbox
          :id="`${label}${i}`"
          :checked="isChecked(item._id)"
          :label="item._id"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { VCheckbox } from './ui';

export default {
  components: {
    VCheckbox
  },
  props: {
    label: {
      type: String,
      default: ''
    },  
    items: {
      type: Array,
      default() {}
    },
    isChecked: {
      type: Function,
      default() {}
    },
    handleChecked: {
      type: Function,
      default() {}
    },
    include: {
      type: Boolean,
      default: false
    },
    targetedItems: {
      type: Array,
      default() {}
    }        
  }, 
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    click() {
      this.expanded = !this.expanded;
    }
  }
}
</script>

<style lang="scss" scoped>
.caret {
  width: 100%;
  box-sizing: border-box;
  padding: 0 26px;
  &:hover, &:focus {
    background-color: #F2F4F7;
  }
  button {
    display: inline-block;
    width: 100%;
    height: 39px;
    line-height: 39px;    
    text-align: left;
    padding-left: 22px; 
    background: url(~svg/ico_caret_right.svg) no-repeat center left 5px;
    outline: none;
    cursor: default;
    span {
      @include ellipsis;
      width: calc(100% - 26px);
      vertical-align: middle;
      color: $text-dark;
    }
  }
  + ul {
    display: none;
  }
  &.expanded {
    button {
      background-image: url(~svg/ico_caret_down.svg);
    }
    + ul {
      display: block;
    }    
  }
}
</style>