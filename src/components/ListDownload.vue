<template>
  <div>
    <v-btn class="btn primary" :click="handleDownload">
      <span>엑셀파일 다운로드</span>
    </v-btn>
  </div>  
</template>

<script>
import { VBtn } from './ui';

export default {
  components: {
    VBtn
  },
  props: {
    handleDownload: {
      type: Function,
      default() {}
    }
  }
}
</script>