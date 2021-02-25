<template>
  <ListFilter :filter="filter" :targets="targets" />
</template>

<script>
import ListFilter from 'components/ListFilter';

export default {
  components: {
    ListFilter
  },
  data() {
    return {
      targets: [       
        { label: '이름', target: 'name' },
        { label: '소속', target: 'company' },
        { label: '부서', target: 'department' },
        { label: '직위', target: 'position' },
        { label: '이메일', target: 'email' },
        { label: '연락처', target: 'phone' },
        { label: '구분', target: 'classification' },
        { label: '유입', target: 'from' },
        { label: '등록일', target: 'date' },
        { label: '내용', target: 'note' },
      ],
    }
  },
  computed: {
    filter() {
      return this.$store.state.filter;
    }
  },
}
</script>