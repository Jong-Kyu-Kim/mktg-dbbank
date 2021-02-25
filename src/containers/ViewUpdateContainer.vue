<template>
  <ViewUpdate
    :target="target"
    :value="value"
    :items="items"
    :set-item="setItem"
    :update="update"
    :user="$store.state.user"
  />
</template>

<script>
import { gql } from 'apollo-boost';
import ViewUpdate from 'components/ViewUpdate';

export default {
  components: {
    ViewUpdate
  },
  props: {
    customer: {
      type: Object,
      default() {}
    }
  },
  data() {
    return {
      target: '',
      value: ''
    }
  },
  computed: {
    items() {
      const { customer } = this;
      const item = (label, target) => ({
        label, target, value: customer[target]
      });

      return [
        item('이름', 'name'),
        item('소속', 'company'),
        item('부서', 'department'),
        item('직위', 'position'),
        item('이메일', 'email'),
        item('연락처', 'phone'),
        item('구분', 'classification'),
      ]
    },
  },
  methods: {
    setItem(item) {
      this.target = item.target;
      this.value = item.value;
    },
    update(e) {
      const { $apollo, $store, customer, target, value } = this;
      const { filter, skip, limit } = $store.state;
      const query = {
        query: gql`
          query ($filter: DBBankFilter, $skip: Int, $limit: Int) {
            dbbankCustomers(filter: $filter, skip: $skip, limit: $limit) {
              _id, name, phone, email, company, department, position, classification, date, unsubscribe, exist, modify,
              histories {
                name, phone, email, company, department, position, from, note, date,
              }
            },
          }
        `,
        variables: {
          filter,
          skip,
          limit,
        }
      }
      
      $apollo.mutate({
        mutation: gql`
          mutation ($_id: String!, $target: String!, $value: String!) {
            updateDBBankCustomer(_id: $_id, target: $target, value: $value) {
              __typename
            }
          }
        `,
        variables: {
          _id: customer._id,
          target,
          value
        },
        update: (store, { data: { updateDBBankCustomer } }) => {
          const { dbbankCustomers } = store.readQuery(query);

          store.writeQuery({
            ...query,
            data: {
              dbbankCustomers: dbbankCustomers.map(data => {
                return data._id === customer._id ? { ...data, [target]: value } : data
              })
            }
          })
        },      
      }).then(() => {
        customer[target] = value;
        this.setItem({
          target: '',
          value: ''
        })
      });
    }
  }
}
</script>