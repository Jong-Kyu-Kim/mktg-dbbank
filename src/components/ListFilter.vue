<template>
  <v-flex class="filter">  
    <div v-for="({ label, target }, i) in targets" :key="i" class="dropdown">
      <button
        class="dialog"
        :class="{on: isOn(target)}"
        @click="e => handleDialog(target)"
      >
        <span>{{ label }}</span>
      </button>
      <div :id="target" class="dialog">
        <TheDialog :title="label" :target="target" />
      </div>
    </div> 
  </v-flex>
</template>

<script>
import TheDialog from './TheDialog';
import { VFlex } from './ui';

export default {
  components: {
    VFlex, TheDialog
  },
  props: {
    filter: {
      type: Object,
      default() {}
    },
    targets: {
      type: Array,
      default() {}
    },
  },
  methods: {    
    isOn(target) {
      const { filter } = this;
      const { date } = filter;
      const dateCond = new Date(date.fromDate).getTime() !== new Date('2011-01-01').getTime() || new Date(date.toDate).getTime() !== new Date().setHours(9,0,0,0);
      const itemsCond = filter[target] && filter[target].items && (filter[target].items.length || filter[target].keyword);

      return target === 'date' ? dateCond : itemsCond;
    },
    handleDialog(target) {
      $('div.dialog').each(function() {
        if ($(this).attr('id') !== target && $(this).dialog('isOpen')) {
          $(this).dialog('close');
        }
      });
      $(`#${target}.dialog`).dialog('open');
    }    
  } 
}
</script>

<style lang="scss" scoped>
.filter {
  height: 59px;
  .dropdown {
    margin-right: 10px;
    margin-bottom: 20px;
    button {
      display: flex;
      align-items: center;
      padding: 9px 15px;
      border: $border-dark;
      border-radius: 33px; 
      /* outline-color: initial;    */
      span {
        font-size: 14px;
        font-weight: 700;
        color: $text-dark;
        & + span {
          font-weight: 500;
          margin-left: 7px;
        }
      }
      /* &:focus {
        border-color: $primary;
      } */
      &::after {
        content: '';
        position: relative;
        display: inline-block;
        margin-left: 5px;
        width: 8px;
        height: 4px;
        background: url(~svg/ico_caret_down.svg) no-repeat;
      }
      &.on {
        border-color: $primary;      
        span {
          color: $primary;
        }
        &::after {
          background-image: url(~svg/ico_caret_down_on.svg);
        }
      }
    }      
  }
}
</style>