<template>
  <div>
    <div class="date">
      <div class="radio">
        <ul>
          <li>
            <v-radio :id="'thisYear'" :name="'dateRange'" :label="'올해'" :click="handleDateRange" />
          </li>
          <li>
            <v-radio :id="'prevYear'" :name="'dateRange'" :label="'작년'" :click="handleDateRange" />
          </li>          
          <li>
            <v-radio :id="'thisMonth'" :name="'dateRange'" :label="'이번달'" :click="handleDateRange" />
          </li>          
          <li>
            <v-radio :id="'prevMonth'" :name="'dateRange'" :label="'지난달'" :click="handleDateRange" />
          </li>
        </ul>
      </div>
      <div class="datepicker">
        <DialogDatepicker :id="'fromDate'" :default-date="fromDate" :set-year-button="setYearButton" :set-date="setDate" :init-date-range="initDateRange" />
        <DialogDatepicker :id="'toDate'" :default-date="toDate" :set-year-button="setYearButton" :set-date="setDate" :init-date-range="initDateRange" />
      </div>
    </div>

    <div class="options">
      <v-checkbox
        :id="`${target}History`"
        :checked="isHistory"
        :change="handleHistory"
        :label="'이력검색'"
      />      
    </div>    
  </div>
</template>

<script>
import DialogDatepicker from './DialogDatepicker';
import { VCheckbox, VRadio } from 'components/ui';

export default {
  components: {
    DialogDatepicker, VCheckbox, VRadio
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    },
    isHistory: {
      type: Boolean,
      default: false
    },
    handleHistory: {
      type: Function,
      default() {}
    },
    fromDate: {
      type: String,
      default: ''
    },
    toDate: {
      type: String,
      default: ''
    }
  },
  methods: {
    setDate(id, date) {
      $(`#${id}`).datepicker('setDate', new Date(date));
    },
    setYearButton(id) {
      const { setDate, initDateRange } = this;

      setTimeout(() => {
        const $datepicker = $(`#${id}`);
        const $widgetHeader = $datepicker.find('.ui-datepicker-header');

        const yrBtn = year => {
          const text  = year > 0 ? 'next' : 'prev';
          const $yrBtn = $(`<a class="${text}-year"><span>${text} year</span></a>`);

          $yrBtn.click(e => {
            e.stopPropagation();
            const getDate = $datepicker.datepicker('getDate');
            const date = new Date(new Date(getDate.setFullYear(getDate.getFullYear() + year)).setHours(9,0,0,0));
            
            if (date >= new Date('2010-01-01') && date <= new Date()) {
              setDate(id, date);
              initDateRange();
            }
          });

          if ($widgetHeader.children(`.${text}-year`).length === 0) {
            $yrBtn.appendTo($widgetHeader);
          }
          
          $datepicker.prev().val($datepicker.val());
        }

        $widgetHeader.find('a').each(function() {
          if (!$(this).hasClass('ui-state-disabled')) {
            $(this).click(function() {
              initDateRange();
            });              
          }            
        });        

        yrBtn(1);
        yrBtn(-1);

      }, 1);
    },
    handleDateRange(e) {
      const when = e.currentTarget.id;
      const year = new Date().getFullYear();
      const month = new Date().getMonth();
      const { setDate, setYearButton } = this;      

      if (when === 'thisYear') {
        setDate('fromDate', new Date(year, 0 ,1));
        setDate('toDate', new Date());
      }
      if (when === 'prevYear') {
        setDate('fromDate', new Date(year - 1, 0 ,1));
        setDate('toDate', new Date(year - 1, 11, 31));
      }      
      if (when === 'prevMonth') {       
        if (month === 0) {
          setDate('fromDate', new Date(year - 1, 11, 1));
          setDate('toDate', new Date(year - 1, 11, 31));
        }
        else {
          setDate('fromDate', new Date(year, month - 1, 1));
          setDate('toDate', new Date(year, month, 0));          
        }
      }
      if (when === 'thisMonth') {
        setDate('fromDate', new Date(year, month, 1));
        setDate('toDate', new Date());
      }
      setYearButton('fromDate');
      setYearButton('toDate');
    },
    initDateRange() {
      $('input[name=dateRange]').each(function() {
        $(this).prop('checked', false);
      })      
    }
  }
}
</script>

<style lang="scss" scoped>
.date {
  display: flex;
  border-top: $border-light;
  > div {
    padding: 12px 0;
    height: 342px;
    &.datepicker {
      display: flex;
    }
    > div {
      margin-left: 15px;
    }    
  }
  .radio {
    padding-right: 20px;
    border-right: $border-light;
  }
}

.options {
  height: 48px;
  line-height: 48px;
  padding: 0 20px;
  border-top: $border-light;
}
</style>