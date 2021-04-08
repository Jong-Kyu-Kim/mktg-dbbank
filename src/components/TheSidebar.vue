<template>
  <div id="sidebar">
    <v-h1>
      <a href="/dbbank">
        <span>MKTG</span> DB Bank
      </a>
    </v-h1>
    <nav>
      <ul>
        <!-- <li>
          <a href="/dbbank"><span>대시보드</span></a>
        </li> -->
        <li>
          <a href="" @click.prevent="() => handleMenu(false, false)">
            <span>고객 리스트</span>
          </a>
        </li>
        <li>
          <a href="" @click.prevent="() => handleMenu(true, false)"><span>수신거부 리스트</span></a>
        </li>
        <li>
          <a href="" @click.prevent="() => handleMenu(false, true)"><span>발송실패 리스트</span></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { VH1 } from './ui';

export default {
  components: {
    VH1
  },
  props: {
    handleMenu: {
      type: Function,
      default() {}
    }
  }
}
</script>

<style lang="scss">
#sidebar {
  width: 240px;
  height: 100%;
  box-sizing: border-box;
  z-index: 2;
  border-right: $border-light;
  background-color: #F7FAFC;
  h1 {
    padding: 33px 25px 24px;
  }
  nav {
    > ul {
      margin-top: 15px;
      > li {
        position: relative;
        a {
          &:hover {
            background-color: #EAF1FE;
            border-color: $primary;
            span {
              color: $primary;
            }
          }
        }
        > a {
          display: block;
          padding: 13px 10px 13px 30px;
          box-sizing: border-box;
          border-left: 3px solid transparent;
          background: no-repeat left 25px top 12px;
          span {
            font-size: 14px;
          }
        }                       
      }
    }
  }
  + div {
    width: calc(100% - 240px);
  }
}
</style>