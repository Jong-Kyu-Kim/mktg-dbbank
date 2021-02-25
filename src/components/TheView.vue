<template>
  <Layout>
    <v-fixed>
      <header>
        <v-flex>
          <v-h2>
            <a href="" @click.prevent="$router.push({ name: 'List'})">              
              <span>
                {{ unsubscribe ? '수신거부 리스트' : returned ? '발송실패 리스트': '고객 리스트' }}
              </span>
            </a>
            <span class="current">{{ customer.name }}</span>
          </v-h2>
        </v-flex>
        <v-flex>
          <v-flex>
            <div>
              <v-avatar class="lg" :class="color">
                {{ customer.name.substr(0,1) }}
              </v-avatar>
            </div>
            <v-flex>
              <div>
                <div>
                  <h3>
                    <span>{{ customer.name }}</span>
                  </h3>
                </div>
                <div>                  
                  <span>{{ customer.company }} {{ customer.department }} {{ customer.position }}</span>
                </div>
              </div>
            </v-flex>          
          </v-flex>
        </v-flex>
      </header>
      <div>
        <section>
          <h3>
            <span>고객 정보</span>
          </h3>
          <ViewUpdateContainer :customer="customer" />
        </section>
          
        <section>
          <h3>
            <span>유입 이력</span>
          </h3>
          <ViewHistory :histories="customer.histories" />
        </section>
      </div>
    </v-fixed>
  </Layout>   
</template>

<script>
import Layout from './TheLayout';
import ViewUpdateContainer from 'containers/ViewUpdateContainer';
import ViewHistory from './ViewHistory';
import { VFixed, VH2, VFlex, VAvatar } from './ui';

export default {
  components: {
    Layout,
    VFixed,
    VH2,
    VFlex,
    VAvatar,
    ViewUpdateContainer,
    ViewHistory
  },
  props: {
    customer: {
      type: Object,
      default() {}
    },
    color: {
      type: String,
      default: ''
    },
    unsubscribe: {
      type: Boolean,
      default: false,
    },
    returned: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.fixed {
  height: 100%;
  header {
    > div {
      margin-bottom: 25px;
      padding: 0 30px;
      &:first-child {
        margin-bottom: 35px;
      }
    }
    + div {
      display: flex;
      justify-content: space-between;  
      height: calc(100% - 182px);
      > section {
        padding: 0 0 0 30px;
        height: 100%;
        &:first-child {      
          width: calc(100% - 565px);
        }
        &:last-child {
          width: 505px;
        }
        h3 {
          margin-right: 15px;
          padding-bottom: 10px;
          border-bottom: $border-light;
        }
        > div {
          height: calc(100% - 30px);
        }
      } 
    }
  }
}
h3 {
  span {
    font-weight: 800;
    font-size: 16px;
    color: $text-dark;
    & + span {
      margin-left: 5px;
    }
  }
  button {
    padding: 2px 0;
  }
}
</style>