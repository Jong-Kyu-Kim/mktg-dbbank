<template>
  <table>
    <slot />
  </table>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
  table-layout: fixed;
	border-collapse: collapse;
	border-spacing: 0;
  th {
    text-align: left;
    vertical-align: middle;
  }
  td {
    height: 55px;
    vertical-align: middle;
    span {
      color: $text-dark;
    }
  }
}
</style>