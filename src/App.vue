<template>
  <router-view v-if="$store.state.user" />
  <div v-else-if="$apollo.queries.user.loading" />
  <LoginContainer v-else />
</template>

<script>
import { gql } from 'apollo-boost';
import LoginContainer from 'containers/LoginContainer';

export default {
  components: {
    LoginContainer
  },
  updated() {
    const { $store, $apollo } = this;
    const { skip, limit, filter } = $store.state;
    if ($apollo.data.user) {
      $store.commit('setUser', $apollo.data.user);
      $store.dispatch('customers', {
        skip,
        limit,
        filter: {
          unsubscribe: filter.unsubscribe,
          returned: filter.returned
        }
      });      
    }    
  },
  apollo: {
    user: gql`
      query {
        user { id dept name },
      }
    `
  }
}
</script>