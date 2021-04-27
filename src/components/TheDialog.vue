<template>
  <DialogDateContainer v-if="target === 'date'" :title="title" :target="target" :set-dialog-action="setDialogAction" />
  <DialogItemsContainer v-else :title="title" :target="target" :set-dialog-action="setDialogAction" />
</template>

<script>
import 'jquery-ui/ui/widgets/dialog.js';
import DialogDateContainer from 'containers/DialogDateContainer';
import DialogItemsContainer from 'containers/DialogItemsContainer';

export default {
  components: {
    DialogDateContainer, DialogItemsContainer
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
  },
  data() {
    return {
      open() {},
      submit() {}
    }
  },
  mounted() {
    const { target, title, open, submit } = this;

    $(`#${target}.dialog`).dialog({
      autoOpen: false,
      width: target === 'date' ? 640 : 480,
      height: 545,
      modal: false,
      title,
      open,
      beforeClose(e) {

      },
      buttons: [
        {
          html: '<span>취소</span>',
          click() {
            $(this).dialog('close');
          } 
        },
        {
          html: '<span>확인</span>',
          click: submit
        },        
      ]
    });
  },
  destroyed() {
    $(`#${this.target}.dialog`).dialog('destroy');  
  },  
  methods: {
    setDialogAction({ open, submit }) {
      this.open = open;
      this.submit = submit;
    },
  },
}
</script>

<style lang="scss">
.ui-draggable .ui-dialog-titlebar {
  cursor: move;  
}

.ui-widget-content {  
  background-color: $white;
  border: $border-dark;
  border-radius: 5px;
  outline: none;
}

.ui-dialog {
  box-shadow: 5px 5px 20px rgba(62, 63, 66, 0.12);
  .ui-dialog-titlebar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 25px;    
    background-color: #fff;
    border-radius: 5px 5px 0px 0px;
    .ui-dialog-title {
      font-size: 16px;
      font-weight: 700;      
      color: $text-dark;
    }
    .ui-dialog-titlebar-close {
      width: 14px;
      height: 14px;      
      font-size: 0;
      background: url(~svg/ico_times.svg) no-repeat;
    }
  }  
  .ui-dialog-content {
    display: flex;
    flex-direction: column;
    //overflow: hidden;    
    border: 0;
    border-radius: 0;
    &.no-title {
      > div:first-child {
        position: relative;
        top: -40px;
        padding-left: 25px;
        display: flex;        
        width: calc(100% - 65px);
        width: max-content;
      }
    }
  }
  .ui-dialog-buttonpane {
    padding: 15px 25px;
    text-align: right;
    background-color: $white;
    border: 0;
    border-top: $border-light;
    border-radius: 0px 0px 5px 5px;
    button {
      padding: 10px 15px;
      background-color: $bg-secondary;
      border-radius: 5px;
      transition: all .2s;
      &:hover {
        text-decoration: none;
        background-color: #E3E5E8;
      }
      &:focus {
        background-color: #D7D8DB;
      }
      span {
        font-size: 14px;
        font-weight: 700;
        color: $text-dark;
      }
      & + button {
        margin-left: 10px;
        
        background-color: $primary;
        &:hover {
          text-decoration: none;
          background-color: #5F96FA;
        }
        &:focus {
          background-color: #2560CC;
        }
        span {
          color: $white;          
        }
      }
    }
  }
}

.ui-widget-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #aaaaaa;
  opacity: .3;  
}

.ui-front {
  z-index: 100;
}
</style>