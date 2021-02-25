<template>
  <div class="history">
    <v-scrollbar>
      <div class="list">
        <ul>
          <li v-for="(history, i) in histories" :key="i">
            <div>
              <div>
                <div>
                  <v-avatar class="user">
                    {{ histories.length - i }}
                  </v-avatar>
                </div>
                <div>
                  <div>
                    <span><strong>{{ history.name }}</strong></span>
                  </div>
                  <div>
                    <span>{{ history.company }}</span>
                    <span>{{ history.department }}</span>
                    <span>{{ history.position }}</span>
                  </div>                                
                  <div>
                    <span> {{ history.email }}</span>
                  </div>
                  <div>
                    <span> {{ history.phone }}</span>
                  </div>                                
                  <div>
                    <span>{{ history.from }}</span>
                    <span>({{ history.date }})</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="history.note" class="memo">
              <span>{{ history.note }}</span>
            </div>                          
          </li>                   
        </ul>
      </div>
    </v-scrollbar>
  </div>  
</template>

<script>
import { VScrollbar, VAvatar } from './ui';

export default {
  components: {
    VScrollbar, VAvatar
  },
  props: {
    histories: {
      type: Array,
      default() {}
    }
  }
}
</script>

<style lang="scss" scoped>
.history {  
  .list {
    padding: 25px 30px 0 0;
    > ul {
      > li {
        margin-bottom: 28px;
        > div {
          &:first-child {
            display: flex;
            justify-content: space-between;
            > div {
              display: flex;
              align-items: center;
              div div + div {
                margin-top: 5px;
              }
            }
          }

          + div {
            margin: 10px 20px 0 40px;
            &.memo {
              padding: 5px 10px;              
              background-color: $bg-secondary;
              border-radius: 5px;
              span {
                color: $text-dark;
              }
            }
          }
        }
      }
    }
  }
}
</style>