<template>
  <div role="tablist" class="tabs">
    <button role="tab" class="tab" :aria-selected="!unsubscribe && !returned" :class="{selected: !unsubscribe && !returned}" @click="() => handleTabMenu(false, false)">
      <span>고객 리스트</span>
    </button>
    <button role="tab" class="tab" :aria-selected="unsubscribe && !returned" :class="{selected: unsubscribe && !returned}" @click="() => handleTabMenu(true, false)">
      <span>수신거부 리스트</span>
    </button>
    <button role="tab" class="tab" :aria-selected="!unsubscribe && returned" :class="{selected: !unsubscribe && returned}" @click="() => handleTabMenu(false, true)">
      <span>발송실패 리스트</span>
    </button>
  </div> 
</template>

<script>
export default {
  props: {
    unsubscribe: {
      type: Boolean,
      default: false,
    },
    returned: {
      type: Boolean,
      default: true,
    },
    handleTabMenu: {
      type: Function,
      default() {}
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  overflow: hidden;
  .tab {
    float: left;
    margin-right: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid transparent;
    &.selected {
      border-color: $primary;
      span {
        color: $primary
      }
    }
  }
}
</style>