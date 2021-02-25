<template>
  <div class="pagination">
    <button class="prev">
      <span>{{ totalPages }}</span>
    </button>
    <template v-for="(pageNumber, i) in totalPages">
      <button
        v-if="Math.abs(i - currentPage) < 3 || i == totalPages - 1 || i == 0"
        :key="i"
        :name="i"
        :class="{current: currentPage === i, first:(i === 0 && Math.abs(i - currentPage) > 3), last: (i == totalPages - 1 && Math.abs(i - currentPage) > 3)}"
        @click="e => click(e)"
      >
        <span>{{ pageNumber }}</span>
      </button>
    </template>
    <button class="next">
      <span>Next</span>
    </button>
  </div>    
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 0
    },
    totalPages:{
      type: Number,
      default: 0
    },
    click: {
      type: Function,
      default() {}
    }
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin: 24px auto;
  text-align: center;
  a, button {
    position: relative;
    display: block;
    margin: 0 8px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    &.current, &:hover {          
      background-color: $primary;
      border-color: $primary;
      border-radius: 32px;
      span {
        color: $white;
      }
    }
    &.first {
      margin-right: 20px;
      &:after {
        content: '...';
        position: absolute;
        right: -18px;
        height: 24px;
        line-height: 24px;        
      }
    }
    &.last {
      margin-left: 20px;
      &:before {
        content: '...';
        position: absolute;
        left: -18px;
        height: 24px;
        line-height: 24px;
      }      
    }
    &.prev, &.next {
      border: $border-dark;
      border-radius: 32px;
      &:hover {
        background-color: $white;
        border-color: $primary;            
      }
      span {
        font-size: 0;            
      }
    }
    &.prev {
      background: url(~svg/ico_angle_left.svg) no-repeat center;
      &:hover {
        background-image: url(~svg/ico_angle_left_on.svg);
      }
    }
    &.next {
      background: url(~svg/ico_angle_right.svg) no-repeat center;
      &:hover {
        background-image: url(~svg/ico_angle_right_on.svg);
      }
    }
  }
  &:first-child {
    margin-left: 0;
  }
}
</style>