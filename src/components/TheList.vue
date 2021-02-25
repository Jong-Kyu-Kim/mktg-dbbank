<template>
  <Layout :scroll="scroll">
    <v-fixed>
      <header>
        <v-flex>
          <v-h2>
            <span class="current">
              {{ unsubscribe ? '수신거부 리스트' : returned ? '발송실패 리스트': '고객 리스트' }}
            </span>
          </v-h2>
        </v-flex>

        <v-flex class="between">
          <ListDownloadContainer />
          <ListSearchContainer />
        </v-flex>

        <ListFilterContainer />

        <v-flex class="between">          
          <ListTabsContainer />
          <ListCountContainer />
        </v-flex>
      </header>
    </v-fixed>
    <ListTableContainer />
    <ListPageContainer />
  </Layout>
</template>

<script>
import Layout from './TheLayout';
import { VFixed, VFlex, VH2 } from './ui';
import ListDownloadContainer from 'containers/ListDownloadContainer';
import ListSearchContainer from 'containers/ListSearchContainer';
import ListFilterContainer from 'containers/ListFilterContainer';
import ListTabsContainer from 'containers/ListTabsContainer';
import ListCountContainer from 'containers/ListCountContainer';
import ListTableContainer from 'containers/ListTableContainer';
import ListPageContainer from 'containers/ListPageContainer';

export default {
  components: {    
    Layout,
    VFixed,
    VFlex,
    VH2,
    ListDownloadContainer,
    ListSearchContainer,
    ListFilterContainer,
    ListTabsContainer,
    ListCountContainer,
    ListTableContainer,
    ListPageContainer
  },
  props: {
    unsubscribe: {
      type: Boolean,
      default: false,
    },
    returned: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    scroll() {      
      const $tableSort = $('.table_sort table');
      $tableSort.eq(0).css('left', $tableSort.eq(1).offset().left);
    },
  },  
}
</script>

<style lang="scss" scoped>
header {
  > div {
    margin-bottom: 25px;
    padding: 0 30px;
    &:first-child {
      margin-bottom: 35px;
    }
    &:last-child {
      margin-bottom: 0;
      border-bottom: $border-light;
    }
  }
}
</style>