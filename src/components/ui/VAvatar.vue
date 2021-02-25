<template>
  <span class="avatar">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.avatar {
  display: inline-block;
  margin-right: 8px;
  width: 32px;
  height: 32px;
  line-height: 32px;
  vertical-align: middle;
  text-align: center;
  font-weight: 700;
  border-radius: 32px;
  color: $white !important;
  &.md {
    width: 48px;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    border-radius: 10px;
  }
  &.lg {
    margin-right: 15px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    border-radius: 60px;
  }
  &.user {
    border-radius: 32px;
    background-color: #94A8CA;
  }
  &.red {
    background-color: #F77E6E;
  }
  &.orange {
    background-color: #F7B243;
  }
  &.purple {
    background-color: #9E7CFD;
  }
  &.blue {
    background-color: #4C86F4;
  }
  &.yellow {
    background-color: #E5BE00;
  }
  &.green {
    background-color: #46CA85;
  }
  &.cyan {
    background-color: #47C7C3;
  }
  &.blue_grey {
    background-color: #47C7C3;
  }
}
</style>