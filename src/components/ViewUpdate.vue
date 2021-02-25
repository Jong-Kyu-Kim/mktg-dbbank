<template>
  <div class="table_form">
    <v-scrollbar>
      <v-table>
        <colgroup>
          <col style="width:190px">
          <col>
        </colgroup>
        <tbody>
          <tr v-for="(item, i) in items" :key="i">
            <th>
              <span>{{ item.label }}</span>
            </th>
            <td>
              <div>
                <div v-if="!target || target !== item.target">
                  <span>{{ item.value ? item.value : '(미입력)' }}</span>
                  <v-btn v-if="user.dept === 'GS사업팀'" class="btn small" :click="e => setItem(item)">
                    <span>변경</span>
                  </v-btn>
                </div>
                <v-flex v-if="target === item.target" class="start">
                  <div>
                    <v-input type="text" :value="value" :keyup="e => setItem({ target, value: e.currentTarget.value })" />
                  </div>
                  <v-flex class="start">
                    <v-btn class="btn primary" :click="update">
                      <span>저장</span>
                    </v-btn>
                    <v-btn class="btn" :click="e => setItem({ target: '', value: '' })">
                      <span>취소</span>
                    </v-btn>
                  </v-flex>
                </v-flex>
              </div>
            </td>
          </tr>
        </tbody>            
      </v-table>
    </v-scrollbar>
  </div>  
</template>

<script>
import { VScrollbar, VTable, VFlex, VBtn, VInput } from './ui';

export default {
  components: {
    VScrollbar, VTable, VFlex, VBtn, VInput
  },
  props: {
    target: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default() {}
    },
    setItem: {
      type: Function,
      default() {}
    },
    update: {
      type: Function,
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
.table_form {
  table {
    > tbody {
      > tr {
        th {
          text-align: left;
          vertical-align: middle;
        }
        > td {
          font-size: 0;
          border: 0;
          > span {
            display: inline-block;
            margin-bottom: 30px;
          }
          input[type=text], textarea, select, .selectmenu {            
            //width: 100%;
            display: inline-block;
            margin-right: 8px;
            width: 230px;
          }

          input[type=checkbox] + label {
            margin-left: 5px
          }
          > ul {
            //margin-bottom: 20px;
            overflow: hidden;
            li {
              display: flex;
              float: left;
              align-items: center;
              margin-right: 20px;
              // > * {
              //   margin-bottom: 10px;
              // }
            }
          }
        }
      }
    }
  }
}
</style>