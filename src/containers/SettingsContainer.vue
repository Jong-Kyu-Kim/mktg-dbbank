<template>
  <Settings :settings="settings" :create-setting="createSetting" :update-setting="updateSetting" :remove-setting="removeSetting" />
</template>

<script>
import { gql } from 'apollo-boost';
import Settings from 'components/TheSettings';

export default {
  components: {
    Settings
  },
  props: {
    notes: {
      type: Array,
      default() {}
    },
  },
  data() {
    return {
      settings: this.notes,
      query: {
        query: gql`
          query ($target: String) {
            dbbankSettings(target: $target) {
              _id target name value order
            },
          }
        `,
        variables: {
          target: 'note'
        }
      }
    }
  },
  methods: {
    createSetting(variables) {
      const { $apollo, query } = this;
      return new Promise((resolve) => {        
        $apollo.mutate({
          mutation: gql`
            mutation ($target: String!, $name: String!, $value: String!, $order: Int!) {
              createDBBankSetting(target: $target, name: $name, value: $value, order: $order) {
                __typename _id target name value order
              }
            }
          `,
          variables,
          update: (store, { data: { createDBBankSetting } }) => {
            const { dbbankSettings } = store.readQuery(query);

            store.writeQuery({
              ...query,
              data: {
                dbbankSettings: dbbankSettings.concat(createDBBankSetting)
              }
            })
          },
        }).then(({ data }) => {
          this.settings = this.settings.concat(data.createDBBankSetting);
          resolve();
        }); 
      });
    },
    updateSetting(variables) {
      $('.dropdown .items').removeClass('expanded');

      const { $apollo, query } = this;
      return new Promise((resolve) => {
        $apollo.mutate({
          mutation: gql`
            mutation ($_id: String!, $target: String!, $name: String!, $value: String!, $order: Int!, $inc: Int!) {
              updateDBBankSetting(_id: $_id, target: $target, name: $name, value: $value, order: $order, inc: $inc) {
                __typename _id target name value order
              }
            }
          `,
          variables,
          update: (store) => {
            const { dbbankSettings } = store.readQuery(query);

            store.writeQuery({
              ...query,
              data: {
                dbbankSettings: dbbankSettings.map((setting) => {
                  if (setting._id === variables._id) {
                    return {
                      ...setting,
                      ...variables,
                      order: setting.order + variables.inc
                    }
                  }
                  if (setting._id !== variables._id && variables.order + variables.inc === 0) { // 순서 가장 위로
                    return {
                      ...setting,
                      order: setting.order + 1
                    }
                  }
                  if (setting._id !== variables._id && variables.order + variables.inc === dbbankSettings.length - 1) { // 순서 가장 아랴로
                    return {
                      ...setting,
                      order: setting.order - 1
                    }
                  }
                  if (setting.order === variables.order + variables.inc) {
                    return {
                      ...setting,
                      order: setting.order - variables.inc
                    }
                  }                  
                  return setting;
                }).sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0)
              }
            })
          },
        }).then(() => {
          const settings = this.settings.map((setting) => {
            if (setting._id === variables._id) {
              return {
                ...setting,
                ...variables,
                order: setting.order + variables.inc
              }
            }
            if (setting._id !== variables._id && variables.order + variables.inc === 0) { // 순서 가장 위로
              return {
                ...setting,
                order: setting.order + 1
              }
            }
            if (setting._id !== variables._id && variables.order + variables.inc === this.settings.length - 1) { // 순서 가장 아랴로
              return {
                ...setting,
                order: setting.order - 1
              }
            }            
            if (setting.order === variables.order + variables.inc) {
              return {
                ...setting,
                order: setting.order - variables.inc
              }
            }                  
            return setting;
          }).sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);

          this.settings = settings;
          resolve();
        }); 
      })
    },
    removeSetting(_id) {
      $('.dropdown .items').removeClass('expanded');

      const { $apollo, query } = this;
      $apollo.mutate({
        mutation: gql`
          mutation ($_id: String!) {
            removeDBBankSetting(_id: $_id) {
              __typename _id target name value order
            }
          }
        `,
        variables: {
          _id,
        },
        update: (store) => {
          const { dbbankSettings } = store.readQuery(query);

          store.writeQuery({
            ...query,
            data: {
              dbbankSettings: dbbankSettings.filter((setting) => {
                return setting._id !== _id;
              })
            }
          })
        },
      }).then(() => {
        this.settings = this.settings.filter((setting) => {
          return setting._id !== _id;
        });
      }); 
    }
  }
}
</script>
 
 