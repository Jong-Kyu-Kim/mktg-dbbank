<template>
  <div>
    <input :id="id" type="radio" :name="name" @click="click">
    <label :for="id"><span>{{ label }}</span></label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },    
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },    
    click: {
      type: Function,
      default() {}
    }    
  },
}
</script>

<style lang="scss" scoped>
input[type=radio] {
  display: none;
  .date & {
    + label {
      display: block;
      padding-left: 38px;
      width: 100%;
      box-sizing: border-box;
      height: 34px;
      line-height: 34px;
      background: none;
      span {
        color: $text-dark;
      }
    }
    &:checked {
      + label {
        background: url(~svg/ico_check.svg) no-repeat left 15px center;
        span {
          color: $primary;
        }
      }
    }
  }  
  + label {    
    padding-left: 22px;
    background: url(~svg/ico_radio.svg) no-repeat left center;
  }
  &:checked {
    + label {
      background-image: url(~svg/ico_radio_checked.svg);
    }
  }  
}
</style>