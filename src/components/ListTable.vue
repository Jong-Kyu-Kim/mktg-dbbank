<template>
  <div class="table_sort">
    <v-table>
      <colgroup>
        <col>
        <col v-for="(col, i) in cols" :key="i" :style="`width:${col}%`">
      </colgroup> 
      <thead>
        <tr>
          <th v-for="({ label, target }, i) in sortItems" :key="sortItems[i].label" scope="col">          
            <!-- <button class="asc"> -->
            <button :class="{asc: sort.filter(sort => sort[target] === 1).length, desc: sort.filter(sort => sort[target] === -1).length}" @click="handleSort(target)">
              <span>{{ label }}</span>
            </button>
          </th>     
        </tr>
      </thead>
    </v-table>
    <v-table>
      <colgroup>
        <col>
        <col v-for="(col, i) in cols" :key="i" :style="`width:${col}%`">
      </colgroup> 
      <tbody>
        <template v-for="item in items">
          <ListTableItem :key="item._id" :item="item" :unsubscribe="unsubscribe" :handle-concat="handleConcat" />
        </template>
      </tbody>
    </v-table>
  </div>      
</template>

<script>
import ListTableItem from './ListTableItem';
import { VTable } from './ui';

export default {
  components: {
    ListTableItem, VTable,
  },
  props: {
    sortItems: {
      type: Array,
      default() {}
    },    
    unsubscribe: {
      type: Boolean,
      default: false
    },    
    items: {
      type: Array,
      default() {}
    },
    sort: {
      type: Array,
      default() {}
    },
    handleSort: {
      type: Function,
      default() {}      
    },
    handleConcat: {
      type: Function,
      default() {}    
    }
  },
  data() {
    return {
      cols: [14, 10, 7, 14, 10, 7, 10, 10, 7],
    }
  },
}
</script>
<style lang="scss" scoped>
.table_sort {
  margin-top: 257px;
  padding: 47px 30px 0;
  table {
    &:first-child {
      position: fixed;
      top: 257px;
      left: 270px;
      width: calc(100% - 240px - 60px);
      min-width: 980px;
      table-layout: fixed;
      tr {
        th {
          padding-top: 10px;
          height: 36px;
          background-color: $white;
          border-bottom: $border-light;
          z-index: 1;        
          button {
            display: flex;
            align-items: center;
            margin-left: 15px;
            padding: 10px 0;
            background: no-repeat right center;
            &:hover {
              text-decoration: underline;
              text-decoration-color: $text-secondary;
            }        
            &.asc, &.desc {
              span {
                font-weight: 700;
                color: $text-dark;
              }            
              &::after {
                content: '';
                position: relative;
                display: inline-block;
                margin-left: 5px;
                width: 9px;
                height: 11px;
              }
              &:hover {
                text-decoration-color: $text-dark;
              }            
            }
            &.asc::after {
              background: url(~svg/ico_arrow_up_dark.svg) no-repeat;
            }          
            &.desc::after {
              background: url(~svg/ico_arrow_down_dark.svg) no-repeat;
            }
          }
        }
      }      
    }
  }  
}
</style>