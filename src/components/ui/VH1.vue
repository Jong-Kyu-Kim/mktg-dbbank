<template>
  <h1>
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
h1 {
  margin: 0 0 30px;    
  font-size: 24px;
  a {
    color: $text-dark;
  }  
  span {
    font-size: 24px;
    color: #2871F5;
  }  
}
</style>