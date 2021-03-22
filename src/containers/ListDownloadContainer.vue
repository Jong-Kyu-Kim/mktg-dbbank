<template>
  <ListDownload :handle-download="handleDownload" />
</template>

<script>
import NProgress from 'nprogress';
import { saveAs } from 'file-saver';
import ListDownload from 'components/ListDownload';

export default {
  components: {
    ListDownload
  },
  methods: {
    handleDownload(e) {
      const { filter } = this.$store.state;
      NProgress.start();
      this.$store.dispatch('customers', {
        skip: 0,
        limit: 0
      }).then(data => {
        NProgress.done();
        const blob = data.dbbankCustomers.reduce((string, data) => {
          const { name, company, department, position, email, phone, date, classification, unsubscribe, histories } = data;
          const r = val => {
            if (val) return val.replace(',', '，').replace(',', '，').replace(',', '，');
            return val;
          }
          const customer = `${r(name)},${r(company)},${r(department)},${r(position)},${r(email)},'${r(phone)},${r(histories[histories.length - 1].from)},${r(classification)},${filter.unsubscribe ? unsubscribe: date}`;
          return `${string}\n${customer}`;
        }, `이름,소속,부서,직위,이메일,연락처,유입,구분,${filter.unsubscribe ? '수신거부일': '최근 등록일'}`);
  
        const file = new Blob([`\ufeff${blob}`], {
          type: 'application/vnd.ms-excel;charset=utf-8'
          // type: 'application/octet-stream'
          // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
  
        saveAs(file, `${filter.unsubscribe ? '수신거부': filter.returned ? '발송실패': '고객'} 리스트.xls`);        
      })
    },
  },
}
</script>