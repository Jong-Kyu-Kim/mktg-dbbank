<template>
  <DialogItems
    :title="title"
    :target="target"
    :items="items"
    :keyword="keyword"
    :handle-search="handleDialogSearch"
    :handle-scroll="handleDialogScroll"
    :handle-checked="handleDialogItemChecked"
    :is-history="history"
    :handle-history="handleDialogHistory"
    :include="include"
    :targeted-items="targetedItems"
  />
</template>

<script>
import DialogItems from 'components/DialogItems';

export default {
  components: {
    DialogItems
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    },
    setDialogAction: {
      type: Function,
      default() {}
    },
    // unsubscribe: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      scroll: true,
      //checked: !this.include,
      items: [],
      history: this.$store.state.filter[this.target] ? this.$store.state.filter[this.target].history : this.target === 'note',
      include: this.$store.state.filter[this.target] ? this.$store.state.filter[this.target].include : false,
      keyword: this.$store.state.filter[this.target] ? this.$store.state.filter[this.target].keyword : '',
      targetedItems: this.$store.state.filter[this.target] ? this.$store.state.filter[this.target].items : []
      // history: false,
      // include: false,
      // keyword: '',
      // targetedItems: []
    }
  },
  computed: {
    returned() {
      return this.$store.state.filter.returned;
    },
    unsubscribe() {
      return this.$store.state.filter.unsubscribe;
    }
  },
  watch: {
    returned() {
      this.setInitData();
    },    
    unsubscribe() {
      this.setInitData();
    }
  },
  created() {
    this.setDialogAction({
      open: () => {
        this.setDialogItems({}, 0).then(data => {
          this.items = data;
        });
      },
      submit: () => {
        const { $store, target, include, keyword, history, getTargetedDialogItems } = this;

        $store.dispatch('customers', {
          skip: 0,
          limit: $store.state.limit,
          filter: {
            [target]: {
              history,
              include,
              keyword,
              items: getTargetedDialogItems(target)
            }
          }
        });

        $(`#${target}`).dialog('close');        
      }
    })
  },
  methods: {
    setInitData() {
      //this.checked = true;
      this.history = this.target === 'note';
      this.include = false;
      this.keyword = '';
      this.items = [];
      this.targetedItems = [];
      $(`#${this.target} input[type=text]`).val('');
    },
    getTargetedDialogItems() {
      const { include } = this;
      const $checkboxes = $(`#${this.target}`).find('.items ul input[type=checkbox]');

      // this가 checkbox를 가리키기 위해 화살표 함수 사용 안함 (jquery의 filter 함수).
      const $checkedkboxes = $checkboxes.filter(function() {
        return include === this.checked;  
      });

      return $.map($checkedkboxes, (checkbox) => {
        const label = $(checkbox).next().find('span').html();                
        return label === '(미입력)' ? '' : label;
      });
    },
    setDialogItems(obj, skip) {
      const { $store, target, history, include, keyword, getTargetedDialogItems } = this;
      const thisTarget = {
        history,
        include,
        keyword,
        items: getTargetedDialogItems(target)
      };

      //$(`#${target}.dialog`).find('.scrollbar').scrollTop(0);

      return $store.dispatch('targetItems', {
        filter: {
          [target]: thisTarget
        },
        target,
        skip
      });
    },
    // isDialogItemChecked(label) {
    //   const { $store, target } = this;
    //   const { filter } = $store.state;

    //   if (filter[target]) {
    //     if (this.include) {
    //       return filter[target].items.indexOf(label) >= 0;
    //     }
    //     return filter[target].items.indexOf(label) < 0;
    //   } 
    //   return true;
    // },
    handleDialogSearch(e) {
      //const { $store, target, include, history, getTargetedDialogItems } = this;
      this.keyword = e.currentTarget.value;
      const { keyword, history } = this;

      this.setDialogItems({ keyword, history }, 0).then(data => {
        this.scroll = true;
        this.items = data;
        // this.items.forEach(({ _id }) => {
        //   console.log(_id)
        // })
      });
    },
    handleDialogScroll(e) {
      const { scrollTop, scrollHeight, offsetHeight, firstChild } = e.currentTarget;
      const skip = firstChild.children.length;
      const { keyword, history } = this;

      if (scrollHeight - offsetHeight - scrollTop <= scrollHeight / 7 && this.scroll && this.target !== 'from') {
        this.scroll = false;        

        this.setDialogItems({ keyword, history }, skip).then(data => {
          this.scroll = true;
          this.items = this.items.concat(data);
        });
      }
    },
    handleDialogItemChecked(e) {
      this.targetedItems = [];
      this.include = !e.currentTarget.checked;
    },
    handleDialogHistory(e) {
      if (this.target === 'note') {
        e.preventDefault();
      }      
      else {
        const history = e.currentTarget.checked;
        this.history = history;

        this.setDialogItems({ history }, 0).then(data => {
          const $dialog = $(`#${this.target}`);

          $dialog.find('.scrollbar').animate({
            scrollTop: 0
          }, 1, 'swing', () => {
            if ($dialog.find('.scrollbar ul').position().top === 0) {
              this.items = data;
            }            
          }, 0);
        });
      }
    }
  }
}
</script>