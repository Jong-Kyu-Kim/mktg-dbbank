<template>
  <div class="total">
    <span>
      <strong>총 {{ count }}건</strong>
    </span>
  </div>  
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    }
  }
}
</script>