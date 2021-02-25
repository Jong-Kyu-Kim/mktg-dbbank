<template>
  <GlobalStyle>
    <main>
      <v-h1><span>MKTG</span> DB Bank</v-h1>
      <div class="login">
        <form @submit.prevent="login">
          <div>
            <v-input type="text" name="id" placeholder="id" />
            <v-input type="password" name="password" placeholder="Password" />
          </div>
          <div>
            <v-btn class="primary">
              <span>로그인</span>
            </v-btn>          
          </div>
        </form>
      </div>
    </main>
  </GlobalStyle>
</template>

<script>
import GlobalStyle from './TheGlobalStyle';
import { VH1, VInput, VBtn } from './ui';

export default {
  components: {
    GlobalStyle, VH1, VInput, VBtn
  },
  props: {
    login: {
      type: Function,
      default() {}
    }
  },
}
</script>

<style lang="scss" scoped>
main {
  margin: 100px auto;
  width: 235px;
  padding: 45px 55px;
  text-align: center;
  border: 1px solid #e4e6ea;
  border-radius: 10px;
  > div {
    overflow: hidden;
    div {
      float: left;
    }
  }
}
</style>