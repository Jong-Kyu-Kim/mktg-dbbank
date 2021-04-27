import { gql } from 'apollo-boost';
import apollo from '../../apollo';

const settings = ({ commit, dispatch, state }, payload) => {
  return new Promise((resolve, reject) => {
    const { target } = payload;

    apollo.defaultClient
      .query({
        query: gql`
          query($target: String) {
            dbbankSettings(target: $target) {
              _id
              target
              name
              value
              order
            }
          }
        `,
        variables: {
          target,
        },
      })
      .then(({ data }) => {
        resolve(data.dbbankSettings);
      });
  });
};

export default settings;
