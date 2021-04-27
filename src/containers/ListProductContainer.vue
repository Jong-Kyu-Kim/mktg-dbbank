<template>
  <ListProduct :notes="notes" :handle-change="handleChange" :filter="filter" :user="$store.state.user" />
</template>

<script>
import ListProduct from 'components/ListProduct';

export default {
  components: {
    ListProduct
  },
  data() {
    return {
      notes: [],
    }
  },
  computed: {
    filter() {
      return this.$store.state.filter;
    }
  },
  beforeMount() {
    this.$store.dispatch('settings', { target: 'note' }).then(data => {
      this.notes = data;      
    }); 
  },
  methods: {
    handleChange(e) {
      const $checkedkboxes = $(e.currentTarget).parents('.flex').find('input').filter(function() {
        return this.checked;
      });

      const keyword = $.map($checkedkboxes, (checkbox) => {
        return this.notes.find(i => i.name === checkbox.id).value;
      }).join().replace(/, /gi, '|').replace(/,/gi, '|');

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