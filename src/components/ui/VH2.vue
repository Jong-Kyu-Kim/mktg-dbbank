<template>
  <h2>
    <slot />
  </h2>
</template>

<style lang="scss" scoped>
h2 {
  display: flex;
  a {
    &:hover {
      text-decoration: underline;
      text-decoration-color: $text-secondary;
    }
    + *::before {
      content: '';
      display: inline-block;
      margin: 0 12px;
      width: 10px;
      height: 17.5px;
      background: url(~svg/ico_chevron_right.svg) no-repeat;
    }  
  }
  span {
    font-weight: 700;
    font-size: 22px;
    &.current {
      color: $text-dark;
    }
  }
  + a {
    padding: 8px 12px;
    background-color: rgba(37, 193, 111, 0.1);  
    border-radius: 5px;
    span {
      color: $text-success;
    }
  }
}
</style>