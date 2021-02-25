<template>
  <tr @click="$router.push({ name: 'View', params: { customer: item, color } })">
  <!-- <tr @dblclick="handleConcat(item)"> -->
    <td>
      <a href="" @click.prevent="">
        <v-avatar :class="color">
          {{ item.name.substr(0,1) }}
        </v-avatar>
        <span>{{ item.name }}</span>
      </a>
    </td>
    <td>
      <span>{{ item.company }}</span>
    </td>
    <td>
      <span>{{ item.department }}</span>
    </td>
    <td>
      <span>{{ item.position }}</span>
    </td>
    <td>
      <span>{{ item.email }}</span>
    </td>
    <td>
      <span>{{ item.phone }}</span>
    </td>
    <td>
      <!-- <span class="level grey"></span> -->
      <span>{{ item.classification }}</span>
    </td>        
    <td>
      <span>{{ item.from }}</span>
    </td>
    <td>
      <span>{{ unsubscribe ? item.unsubscribe : item.date }}</span>
      <!-- <span>{{ item.date }}</span> -->
    </td>
    <td>
      <span>{{ item.histories.length }}</span>
    </td>
  </tr>  
</template>
<script>
import { VAvatar } from './ui';

export default {
  components: {
    VAvatar
  },
  props: {
    item: {
      type: Object,
      default() {}
    },
    unsubscribe: {
      type: Boolean,
      default: false
    },
    handleConcat: {
      type: Function,
      default() {}    
    }    
  },
  data() {
    return {
      colors: ['red', 'orange', 'purple', 'blue', 'yellow', 'green', 'cyan', 'blue_grey'],
    }
  },
  computed: {
    color() {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    }
  },
}
</script>

<style lang="scss" scoped>
tr {
  td {
    height: 55px;
    box-sizing: border-box;
    vertical-align: middle;
    border-bottom: $border-light;      
    > * {
      margin-left: 15px;
    }      
    span {
      z-index: -1;
      &:not(.avatar) {
        @include ellipsis;
        width: calc(100% - 40px);
        color: $text-dark;              
      }
    }
    &:first-child {
      a {
        display: flex;
        align-items: center;
        &:hover {
          span + span {
            color: $primary;
            text-decoration: underline;
            text-decoration-color: $primary;
          }        
        }
      }        
      .avatar {          
        & + span {
          font-weight: 700;
        }
      } 
    }
  }
  &:hover {
    background-color: rgba(40, 113, 245, 0.08);
  }
}
</style>