<template>
  <TheLogin :login="login" />
</template>

<script>
import { gql } from 'apollo-boost';
import TheLogin from 'components/TheLogin';
import NProgress from 'nprogress';

export default {
  components: {
    TheLogin
  },
  methods: {
    login(e) {
      const { id, password } = e.currentTarget;

      if (!id.value)  {
        alert ('아이디를 입력하세요.');
        id.focus();
        return false;
      }

      if (!password.value) {
        alert ('비밀번호를 입력하세요.');
        password.focus();        
        return false;
      }

      NProgress.start();
            
      this.$apollo.mutate({
        mutation: gql`
          mutation ($id: String!, $password: String!) {
            signinUser(id: $id, password: $password) {
              id dept name
            }
          }
        `,
        variables: {
          id: id.value,
          password: password.value
        },
      }).then(({ data }) => {        
        NProgress.done();
        if (data.signinUser) {
          const { $store } = this;
          const { skip, limit, filter } = $store.state;
          $store.commit('setUser', data.signinUser);
          $store.dispatch('customers', {
            skip,
            limit,
            filter: {
              unsubscribe: filter.unsubscribe,
              returned: filter.returned,
            }
          });          
        }
        else {          
          alert('잘못된 로그인 정보이거나 권한이 없습니다.');
        }
      });
    }
  }
}
</script>