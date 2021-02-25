<template>
  <div class="flex">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  &.between {
    justify-content: space-between;
  }
  &.start {
    justify-content: flex-start;
  }
  &.end {
    justify-content: flex-end 
  }  
}
</style>