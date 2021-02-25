<template>
  <div class="fixed">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.fixed {
  position: fixed;
  top: 0;
  padding-top: 37px;
  left: 240px;
  width: calc(100% - 240px);
  min-width: 1040px;
  z-index: 1;
  background-color: $white;
}
</style>