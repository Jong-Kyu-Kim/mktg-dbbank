<template>
  <button class="btn" :disabled="disabled" @click="e => click()">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    click: {
      type: Function,
      default() {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  transition: all .2s;
  span {
    color: $primary;
  }  
  &:hover {
    text-decoration: underline;
    text-decoration-color: #5F96FA;
    span {
      color: #5F96FA;
    }
  }
  &:disabled, &.disabled {
    cursor: default;
    &:hover {
      text-decoration: none;
    }
    span {
      color: #BFD5FC;
    }
  }    
  &:not(.small) {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-radius: 5px;
    span {
      font-size: 14px;
    }    
  }
  &.small {
    span + & {
      margin-left: 10px;
    }    
  } 
  &.primary {
    background-color: $primary;
    outline: none;
    span {
      font-weight: 700;
      color: $white !important;
    }
    &.download {
      padding-left: 31px;
      background: url(~svg/ico_download_light.svg) $primary no-repeat left 10px center;
      background-size: 16px;
    }        
    &:hover {
      text-decoration: none;
      background-color: #5F96FA;
    }
    &:focus {
      background-color: #2560CC;
    }
    &:disabled, &.disabled {
      background-color: #BFD5FC;
    }
  }
  &.secondary {
    background-color: $bg-secondary;
    outline: none;
    span {
      font-weight: 700;
      color: $text-dark;      
    }
    /* &.plus {
      padding-left: 31px;
      background: url(~svg/ico_plus.svg) $bg-secondary no-repeat left 10px center;
      background-size: 18px;
    }         */
    &:hover {
      text-decoration: none;
      background-color: #E3E5E8;
    }
    &:focus {
      background-color: #D7D8DB;
    }
    &:disabled, &.disabled {
      background-color: #F0F2F5;
      span {
        color: #BDC2C7 !important;
      }      
    }
  }
}

.login .btn {
  margin-left: 5px;
  width: 70px;
  height: 75px;
}
</style>