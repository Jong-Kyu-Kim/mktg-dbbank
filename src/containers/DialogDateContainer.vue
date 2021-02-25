<template>
  <DialogDate
    :title="title"
    :target="target"
    :is-history="history"
    :handle-history="handleDialogHistory"
    :from-date="fromDate"
    :to-date="toDate"
  />
</template>

<script>
import DialogDate from 'components/DialogDate';

export default {
  components: {
    DialogDate
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    },
    setDialogAction: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      history: this.$store.state.filter[this.target] ? this.$store.state.filter[this.target].history :false,
      fromDate: this.$store.state.filter.date.fromDate,
      toDate: this.$store.state.filter.date.toDate,
    }
  },
  computed: {
    // targeted() {
    //   return this.$store.state.filter[this.target];
    // }
    exist() {
      return this.$store.state.filter.exist;
    },
    unsubscribe() {
      return this.$store.state.filter.unsubscribe;
    },
  },
  watch: {
    exist() {
      this.setInitData();
    },
    unsubscribe() {
      this.setInitData();
    }    
  },
  created() {
    this.setDialogAction({
      open: () => {},
      submit: () => {
        const { $store, target, history } = this;

        const fromDate = $('#fromDate').val();
        const toDate = $('#toDate').val();

        $store.dispatch('customers', {
          skip: 0,
          limit: $store.state.limit,
          filter: {
            [target]: {
              history,
              fromDate,
              toDate
            }
          }
        });

        $(`#${target}`).dialog('close');        
      }
    })
  },
  methods: {
    getTwoDigit(value) {
      return value < 10 ? `0${value}` : `${value}`;
    },
    setInitData() {
      const fromDate = '2011-01-01';
      const toDate = `${new Date().getFullYear()}-${this.getTwoDigit(new Date().getMonth() + 1)}-${this.getTwoDigit(new Date().getDate())}`;

      this.history = false;
      this.fromDate = fromDate;
      this.toDate = toDate;

      $('#fromDate').datepicker('setDate', fromDate);
      $('#toDate').datepicker('setDate', toDate);
    },    
    setDialogItems() {
      const { $store, target, history } = this;

      return $store.dispatch('targetItems', {
        filter: {
          [target]: {
            history,
            fromDate: $('#fromDate').val(),
            toDate: $('#toDate').val()
          }
        },
        target,
        skip
      });
    },    
    handleDialogHistory(e) {
      const history = e.currentTarget.checked;
      this.history = history;
    }
  }
}
</script>