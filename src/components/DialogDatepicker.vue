<template>
  <div>
    <v-input type="text" :value="defaultDate" placeholder="yyyy-mm-dd" />
    <div :id="id" />
  </div>
</template>

<script>
import { VInput } from './ui';
import 'jquery-ui/ui/widgets/datepicker';

export default {
  components: {
    VInput
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    defaultDate: {
      type: String,
      default: ''      
    },
    setYearButton: {
      type: Function,
      default() {}
    },
    setDate: {
      type: Function,
      default() {}
    },
    initDateRange: {
      type: Function,
      default() {}
    }
  },
  mounted() {
    const { id, setDate, setYearButton, initDateRange } = this;

    $(`#${id}`).datepicker({
      minDate: '2010-01-01',
      maxDate: new Date(),
      defaultDate: this.defaultDate,
      dateFormat: 'yy-mm-dd',
      dayNamesMin: [ '일','월','화','수','목','금','토' ],
      monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
      selectOtherMonths: true,    
      showMonthAfterYear: true,    
      showOtherMonths: true,
      onChangeMonthYear: function (year, month) {
        const date = $(this).datepicker('getDate').getDate();
        setYearButton(id);                
        setDate(id, new Date(year, month - 1, date));
      },
      onSelect: function() {
        setYearButton(id);
        initDateRange();
      },
    });
    
    setYearButton(id);
  },
  methods: {
  }
}
</script>

<style lang="scss">
.datepicker {
  input[type=text] {
    width: 100%;
    background-image: url(~svg/ico_calendar.svg);
    background-repeat: no-repeat;
    background-position: right 15px center;
  }
}

.ui-widget-content.ui-datepicker {
  width: 242px;
  border: 0;
  border-radius: 0;
  a, button {
    position: relative;
    display: block;    
    text-align: center;
    width: 18px;
    line-height: 18px;
    font-size: 13px;
    font-weight: 600;
    color: $text-secondary;    
    transform: skew(-0.1deg);
  }  
  .ui-datepicker-header {
    position: relative;
    padding: 16px 0;
    text-align: center;
    a {
      position: absolute;
      top: 15px;
      background: no-repeat center;
      cursor: pointer;
      span {
        font-size: 0;
      }
    }    
    .ui-datepicker-prev {
      left: 60px;
      background-image: url(~svg/ico_angle_left.svg);
    }
    .ui-datepicker-next {
      right: 60px;
      background-image: url(~svg/ico_angle_right.svg);
    }
    .prev-year {
      left: 40px;
      background-image: url(~svg/ico_angle_double_left.svg);
    }
    .next-year {
      right: 40px;
      background-image: url(~svg/ico_angle_double_right.svg);
    }
    .ui-datepicker-title {
      font-size: 0;      
      span {
        font-size: 13px;
        font-weight: 700;
        color: $text-dark;
        + span {
          &::before {
            content: '.';
          }
        }
      }
    }    
  }
  .ui-datepicker-calendar {
    /* padding: 16px 20px; */
    border-top: $border-light;
    tr {
      th, td {
        padding-left: 5px;
        padding-right: 5px;
        width: 18px;
        height: 18px;
        text-align: center;
        border: 0;
        &:first-child {
          padding-left: 20px;
        }
        &:last-child {
          padding-right: 20px;
        }
        &.ui-state-disabled {
          span {
            color: $text-muted;
          }
        }
      }    
      th {
        padding-top: 16px;
        padding-bottom: 8px;
        span {
          color: $text-dark;
        }
      }
      td {
        padding-top: 7px;
        padding-bottom: 7px;
        &.ui-datepicker-week-end {
          a {
            color: #27BDB8;
          }
          &:first-child {
            a {
              color: #F6705E;
            }
          }
        }
        &.ui-datepicker-other-month  {
          a {
            color: $text-muted !important;
          }
        }
        &.ui-datepicker-current-day {
          a {
            color: #fff !important;
            background-color: #2871F5;
            border-radius: 18px;
          }
        }
      }
      &:last-child {
        td {
          padding-bottom: 16px;
        }
      }      
    }
  }
}
</style>