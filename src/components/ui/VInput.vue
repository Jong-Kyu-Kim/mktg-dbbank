<template>
  <input type="text" @keyup="keyup">
</template>

<script>
export default {
  props: {
    model: {
      type: String,
      default: ''
    },    
    keyup: {
      type: Function,
      default() {}
    },
    change: {
      type: Function,
      default() {}
    }    
  }
}
</script>

<style lang="scss" scoped>
input[type=text] {
  &:-ms-clear {
    display:none;
  }
  &::-ms-clear {
    display:none;
  }
}

input[type=text], input[type=password] {
  .login & {
    display: block;
    width: 150px;
    margin-bottom: 3px;
    font-family: sans-serif;
    color: #000;    
  }
  padding: 9px 13px;
  height: 36px;
  font-size: 13px;
  box-sizing: border-box;
  border: $border-dark;
  border-radius: 5px;
  appearance: none;
  outline: none;
  transform: skew(-0.1deg);
  &:focus {
    border-color: $primary
  }
  &.search {
    padding-right: 38px;
    background: url(~svg/ico_search.svg) no-repeat right 15px top 9px;
    &.global {
      padding: 0 15px 0 38px;
      width: 310px;
      background-position: left 15px center;
    };
  }
  & + .btn, & + select  {
    margin-left: 8px;
    min-width: 85px;
    box-sizing: border-box;
  }
  &:disabled {
    background-color: $bg-secondary;
  }
  &::placeholder {
    //font-size: 13px;
    // font-weight: 600;
    transform: skew(-0.1deg);
  }
}
</style>