import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
  uri: `${location.origin}/graphql`,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(VueApollo);

export default apolloProvider;