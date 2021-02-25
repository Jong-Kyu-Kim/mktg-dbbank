<template>
  <GlobalStyle>
    <div id="container">
      <Sidebar />
      <main>
        <v-scrollbar :scroll="layoutScroll">
          <div id="content">
            <slot />
          </div>        
        </v-scrollbar>
      </main>    
    </div>    
  </GlobalStyle>
</template>

<script>
import GlobalStyle from './TheGlobalStyle';
import Sidebar from './TheSidebar';
import { VScrollbar } from './ui';

export default {
  components: {
    GlobalStyle,
    Sidebar,
    VScrollbar
  },
  props: {
    scroll: {
      type: Function,
      default() {}
    }
  },
  methods: {
    layoutScroll(e) {
      $('.fixed').css('left', 240 - $(e.currentTarget).scrollLeft());
      this.scroll && this.scroll();
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  justify-content: flex-start;
  height: 100%;
  main {
    display: flex;
    width: calc(100% - 240px);

    #content {
      min-width: 1040px;
      min-height: 100%;
    }
  }
}
</style>