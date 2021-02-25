<template>
  <div class="items">
    <div>
      <v-input type="text" class="search global" :value="keyword" placeholder="검색어를 입력하세요." :keyup="handleSearch" />
    </div>
    <v-scrollbar :scroll="handleScroll">
      <ul>
        <li v-for="(item, i) in items" :key="item._id">
          <DialogItemsCategorize
            v-if="item.categorizedItems"
            :label="item._id"
            :items="item.categorizedItems"
            :is-checked="isChecked"
            :include="include"
            :targeted-items="targetedItems"
          />
          <v-checkbox
            v-else
            :id="target + i"
            :checked="isChecked(item._id)"
            :label="item._id === '' ? '(미입력)': item._id"
          />
        </li>
      </ul>
    </v-scrollbar>
    <div class="options">
      <v-checkbox
        v-if="target !== 'date'"
        :id="`${target}All`"
        :checked="!include"
        :change="handleChecked"
        :label="'전체선택'"
      />
      <v-checkbox
        :id="`${target}History`"
        :checked="isHistory"
        :change="handleHistory"
        :label="'이력검색'"
      />      
    </div>    
  </div>
</template>

<script>
import DialogItemsCategorize from './DialogItemsCategorize'
import { VInput, VScrollbar, VCheckbox } from 'components/ui';

export default {
  components: {
    DialogItemsCategorize, VInput, VScrollbar, VCheckbox
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    },
    open: {
      type: Function,
      default() {}
    },
    submit: {
      type: Function,
      default() {}
    },    
    items: {
      type: Array,
      default() {}
    },
    keyword: {
      type: String,
      default: ''
    },
    handleSearch: {
      type: Function,
      default() {}
    },
    handleScroll: {
      type: Function,
      default() {}      
    },
    // isChecked: {
    //   type: Boolean,
    //   default: true
    // },
    handleChecked: {
      type: Function,
      default() {}
    },    
    // isCheckedAll: {
    //   type: Boolean,
    //   default: true
    // },    
    // handleCheckedAll: {
    //   type: Function,
    //   default() {}
    // },
    isHistory: {
      type: Boolean,
      default: false
    },
    handleHistory: {
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
      isChecked: function(item) {
        if (this.targetedItems.length) {
          if (this.include) {
            return this.targetedItems.indexOf(item) > -1;
          }
          return this.targetedItems.indexOf(item) < 0;
        }
        return !this.include;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.items {  
  height: 319px;
  input[type=text].search.global {
    padding: 0 15px 0 55px;
    width: 100%;
    height: 44px;
    border: 0;
    border-top: $border-light;
    border-bottom: $border-light;
    border-radius: 0;
    background-position: left 25px center;
    outline: none;
  }
}
.options {
  display: flex;
  height: 48px;
  line-height: 48px;
  padding: 0 20px;
  border-top: $border-light;
  div + div {
    margin-left: 20px;
  }
}
</style>