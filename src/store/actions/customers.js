import { gql } from 'apollo-boost';
import apollo from '../../apollo';
import { initialFilter } from '../';

const customers = ({ commit, state }, payload) => {
  return new Promise((resolve, reject) => {
    const { skip, limit } = payload;

    // 메뉴 바뀔때 탭 init 설정
    let filter;
    const sort = payload.sort ? payload.sort : state.sort;

    if (payload.filter) {
      const unsubscribe = payload.filter.unsubscribe !== undefined && payload.filter.unsubscribe !== state.filter.unsubscribe;
      const returned = payload.filter.returned !== undefined && payload.filter.returned !== state.filter.returned;
      

      if (unsubscribe || returned) {
        filter = { ...initialFilter, ...payload.filter }
      }
      else {
        filter = { ...state.filter, ...payload.filter }
      }
    }
    else {
      filter = state.filter;
    }
  
    apollo.defaultClient.query({
      query: gql`
        query($filter: DBBankFilter, $sort: [DBBankSort], $skip: Int, $limit: Int) {
          dbbankCount(filter: $filter)
          dbbankCustomers(filter: $filter, sort: $sort, skip: $skip, limit: $limit) {
            _id, name, phone, email, company, department, position, classification, from, date, unsubscribe, returned, modify,
            histories {
              name, phone, email, company, department, position, from, note, date,
            }
          }
        }
      `,
      variables: {
        filter,
        skip,
        limit,
        sort,
      }       
    }).then(({ data }) => {
      if (limit) {        
        commit('setFilter', filter);        
        commit('setSkip', skip);
        commit('setSort', sort);
        commit('setCount', data.dbbankCount);
        commit('setItems', data.dbbankCustomers);
        $('.scrollbar').scrollTop(0);
      }
      resolve(data);
    });
  });
}  

export default customers;
