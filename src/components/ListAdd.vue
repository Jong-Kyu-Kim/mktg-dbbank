<template>
  <div>
    <v-btn v-if="user.dept === 'GS사업팀' && !unsubscribe && !returned" class="btn secondary plus" :disabled="false" :click="handleClick">
      <span>신규 DB 추가</span>
    </v-btn>
    <div id="add" class="dialog text" title="신규 DB 추가">
      <div tabindex="0">
        <p><strong>{{ length }}</strong>건의 신규 DB가 등록되어 있습니다. 추가하시겠습니까?</p>
      </div>
    </div>
  </div>  
</template>

<script>
import { VBtn } from './ui';

export default {
  components: {
    VBtn
  },
  props: {
    user: {
      type: Object,
      default() {}      
    },
    length: {
      type: Number,
      default: 0
    },
    handleAdd: {
      type: Function,
      default() {}
    },
    unsubscribe: {
      type: Boolean,
      default: false
    },
    returned: {
      type: Boolean,
      default: false
    },
  },
  mounted() {
    $('#add').dialog({
      autoOpen: false,
        modal: true,
        width: 400,
        buttons: [
          {
            html: '<span>취소</span>',
            click() {
              $(this).dialog('close');
            } 
          },
          {
            html: '<span>확인</span>',
            click: this.handleAdd
          },        
        ]      
    })
  },  
  methods: {
    handleClick() {
      $('#add').dialog('open');
    }
  },

}
</script>

<style lang="scss">
div.ui-dialog[aria-describedby=add] {
  .ui-dialog-titlebar {
    background-color: #F0F2F5;
  }
}
.dialog.text {  
  div {
    outline: none;
    p {
      margin: 0 25px 10px;
      &:first-child {
        margin-top: 30px;
      }
      &:last-child {
        margin-bottom: 30px;
      }      
    }
  }
}
</style>