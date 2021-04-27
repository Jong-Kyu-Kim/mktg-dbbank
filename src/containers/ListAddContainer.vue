<template>
  <ListAdd
    v-if="$apollo.data.dbbankNewCustomers"
    :length="$apollo.data.dbbankNewCustomers"
    :handle-add="handleAdd"
    :user="$store.state.user"
    :returned="returned"
    :unsubscribe="unsubscribe"
  />
</template>

<script>
import { gql } from 'apollo-boost';
import ListAdd from 'components/ListAdd';

export default {
  components: {
    ListAdd
  },
  computed: {
    returned() {
      return this.$store.state.filter.returned;
    },
    unsubscribe() {
      return this.$store.state.filter.unsubscribe;
    }
  },
  methods: {
    handleAdd() {
      $('#add').dialog('close');

      // this.$apollo.mutate({
      //   mutation: gql`
      //     mutation {
      //       addDBBankCustomers {
      //         _id
      //         name
      //         phone
      //         email
      //         company
      //         department
      //         position
      //         classification
      //         from
      //         date
      //         unsubscribe
      //         returned
      //         modify
      //       }
      //     }
      //   `,
      // })
    }
  },
  apollo: {
    dbbankNewCustomers: gql`
      query {
        dbbankNewCustomers
      }
    `,
  },
}
</script>