import { gql } from 'apollo-boost';
import apollo from '../../apollo';

const targetItems = ({ commit, dispatch, state }, payload) => {
  return new Promise((resolve, reject) => {
    const filter = payload.filter ? { ...state.filter, ...payload.filter } : state.filter;
    const { target, skip } = payload;    

    apollo.defaultClient.query({
      query: gql`
        query($filter: DBBankFilter, $target: String, $skip: Int) {
          dbbankTargetItems(filter: $filter, target: $target, skip: $skip) {
            _id
          }
        }
      `,
      variables: {
        filter, target, skip
      },  
    }).then(({ data }) => {
      const initialFilterTarget = {
        history: false,
        include: false,
        keyword: '',
        items: []
      }

      // if (JSON.stringify(payload.filter[target]) !== JSON.stringify(initialFilterTarget) && JSON.stringify(payload.filter[target]) !== JSON.stringify(state.filter[target])) {
      //   commit('setFilter', filter);
      // }
      
      if (target === 'from') {
        const items = data.dbbankTargetItems.reduce((array, item) => {      
          if (item._id.length && !isNaN(item._id.substr(0,4))) {
            const categorizedItems = array.filter(({ _id, categorizedItems }) => {
              const cond = _id === item._id.substr(0,4);
              cond && categorizedItems.push(item);
              return cond;
            });

            if (!categorizedItems.length) {
              array.push({
                _id: item._id.substr(0,4),
                categorizedItems: [ item ]
              });
            }
          }
          else {
            array.push(item)
          }
          
          return array;
        }, []);

        resolve(items);
      }
      else {
        resolve(data.dbbankTargetItems);
      }
    });
  });
}

export default targetItems;
