<template>
  <ListProduct :products="products" :handle-change="handleChange" :filter="filter" />
</template>

<script>
import ListProduct from 'components/ListProduct';

export default {
  components: {
    ListProduct
  },
  data() {
    return {
      products: [       
        { _id: 'FED', keyword: 'FED|DRM|FED-R|FSN|FSD|FSE|FED-R|FED-E|클라우드|문서보안' },
        { _id: 'FDR', keyword: 'FDR|Fasoo Data Radar|다크데이터|식별|분류' },
        { _id: 'FRV', keyword: 'FRV|Fasoo RiskView' },
        { _id: 'FED-M', keyword: 'FED-M|Mobile|모바일' },
        { _id: 'FSW', keyword: 'FSW|Fasoo Secure Web|웹' },
        { _id: 'FSS', keyword: 'FSS|Fasoo Secure Screen|Fasoo Smart Screen|화면' },
        { _id: 'FSP', keyword: 'FSP|Fasoo Smart Print|출력|인쇄' },
        { _id: 'Wrapsody', keyword: 'Wrapsody|문서관리|문서중앙화|문서자산화|다크데이터' },
        { _id: 'Wrapsody eCo', keyword: 'Wrapsody eCo|협업' },
        { _id: 'ADID', keyword: 'ADID|AnalyticDID|ADS|비식별|가명정보' },
      ],
    }
  },
  computed: {
    filter() {
      return this.$store.state.filter;
    }
  },
  methods: {
    handleChange(e) {
      const $checkedkboxes = $(e.currentTarget).parents('.flex').find('input').filter(function() {
        return this.checked;
      });

      const keyword = $.map($checkedkboxes, (checkbox) => {
        return this.products.find(i => i._id === checkbox.id).keyword;
      }).join('|');

      // const { $store, target, include, history, getTargetedDialogItems } = this;

      this.$store.dispatch('customers', {
        skip: 0,
        limit: this.$store.state.limit,
        filter: {
          note: {
            history: true,
            include: false,
            keyword,
            items: []
          }
        }
      });
    }
  }
}
</script>