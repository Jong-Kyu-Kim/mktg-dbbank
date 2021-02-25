<template>
  <ListTable :sort-items="sortItems" :items="items" :unsubscribe="unsubscribe" :sort="sort" :handle-sort="handleSort" :handle-concat="handleConcat" />  
</template>

<script>
import { gql } from 'apollo-boost';
import ListTable from 'components/ListTable';

export default {
  components: {
    ListTable
  },
  data() {
    return {
      concat: {
        updateId: '',
        deleteId: ''
      }
    }
  },
  computed: {
    unsubscribe() {
      return this.$store.state.filter.unsubscribe;
    },
    sort() {
      return this.$store.state.sort;
    },
    sortItems() {
      return [
        { label: '이름', target: 'name' },
        { label: '소속', target: 'company' },
        { label: '부서', target: 'department' },
        { label: '직위', target: 'position' },
        { label: '이메일', target: 'email' },
        { label: '연락처', target: 'phone' },
        { label: '구분', target: 'classification' },
        { label: '유입', target: 'from' },
        this.unsubscribe ? { label: '수신거부일', target: 'unsubscribe' } : { label: '등록일', target: 'date' },
        { label: '이력', target: 'count' },
      ]
    },    
    items() {
      return this.$store.state.items;
    },
  },
  methods: {
    handleSort(target) {
      const filter = this.sort.filter(item => item[target]);

      const sort = filter.length ? this.sort.reduce((arr, item) => {
        if (item[target] === 1) {
          arr.push({
            [target]: -1
          });
        }
        else {
          if (item[target] !== -1) {
            arr.push(item);
          }
        }
        return arr;
      }, []) : this.sort.concat({
          [target]: 1
        });

      this.$store.dispatch('customers', {
        sort,
        skip: 0,
        limit: this.$store.state.limit,
      });      
    },
    handleConcat(customer) {      
      if (this.concat.updateId) {
        this.concat.deleteId = customer._id;
        this.concat.histories = this.concat.histories.concat(customer.histories);
        const stringy = this.concat.histories.map((history, i) => {
          delete history.__typename;
          return JSON.stringify(history);
        });
        const histories = Array.from(new Set(stringy)).map(history => {
          return JSON.parse(history);
        });
        const { updateId, deleteId } = this.concat;
        this.$apollo.mutate({
          mutation: gql`mutation ($updateId: String!, $histories: [DBBankCustomerHistories], $deleteId: String) {
            concatDBBankCustomer(updateId: $updateId, histories: $histories) {
              __typename
            }
            removeDBBankCustomer(_id: $deleteId) {
              __typename
            }
          }`,
          // Parameters
          variables: {
            updateId, histories, deleteId
          },
        });
      }
      else {
        console.log('update targeted')
        this.concat.updateId = customer._id;
        this.concat.histories = customer.histories;
      }
    }
  }
}
</script>