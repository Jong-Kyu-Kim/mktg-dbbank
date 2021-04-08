<template>
  <div class="checkbox">
    <input :id="id" type="checkbox" :checked="checked" @click="change">
    <label :for="id">
      <span>{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },    
    change: {
      type: Function,
      default() {}
    },
    label: {
      type: String,
      default: ''      
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  .items ul & {
    padding: 0 26px;
    &:hover, &:focus {
      background-color: #F2F4F7;
    }    
    > * {
      display: inline-block;
      width: 100%;
      height: 39px;
      line-height: 39px;
    }
    span {
      @include ellipsis;
      width: calc(100% - 26px);
      vertical-align: middle;
      color: $text-dark;
    }
  }
  .items .caret + ul & {
    padding-left: 48px;
  }  
  input[type=checkbox] {
    display: none;
    + label {
      padding-left: 22px;
      background: url(~svg/ico_checkbox.svg) no-repeat left center;
      span {
        vertical-align: middle;
      }
    }
    &:checked {
      + label {
        background-image: url(~svg/ico_checkbox_checked.svg);
      }
    }  
  }
  + .checkbox {
    margin-left: 15px;
  }
}
</style>