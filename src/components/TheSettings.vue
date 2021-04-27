<template>
  <Layout>
    <v-fixed>
      <header>
        <v-flex>
          <v-h2>
            <span class="current">Settings</span>
          </v-h2>
        </v-flex>
      </header>
      <div class="form">
        <v-scrollbar>
          <section>
            <div>
              <h3>
                <span>이력 내용 필터 설정</span>
              </h3>
            </div>
            <div class="table_expand">
              <v-table>
                <colgroup>
                  <col style="width:160px;">
                  <col>
                  <col style="width:135px;">
                </colgroup>
                <thead>
                  <tr>                    
                    <th scope="col">
                      <span>이름</span>
                    </th>
                    <th scope="col">
                      <span>키워드</span>
                    </th>
                    <th scope="col">
                      &nbsp;
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="({ _id, target, name, value, order }, i) in settings" :key="i">
                    <template v-if="modify && modify._id === _id">
                      <td>
                        <v-input type="text" class="" name="name" placeholder="" :value="name" :keyup="(e) => handleInput(e, 'modify')" />
                      </td>
                      <td>
                        <v-input type="text" class="" name="value" placeholder="" :value="value" :keyup="(e) => handleInput(e, 'modify')" />
                      </td>
                      <td>
                        <v-flex>
                          <v-btn class="btn primary" :click="() => updateSetting({ ...modify, inc: 0 }).then(() => toggleModify({ _id }))">
                            <span>저장</span>
                          </v-btn>
                          <v-btn class="btn" :click="() => toggleModify({ _id })">
                            <span>취소</span>
                          </v-btn>                        
                        </v-flex>
                      </td>                      
                    </template>                    
                    <template v-else>
                      <td><span><strong>{{ name }}</strong></span></td>
                      <td><span>{{ value }}</span></td>
                      <td>
                        <div class="dropdown">
                          <button class="ellipsis_h" @click="handleDropdown">
                            &nbsp;
                          </button>
                          <div class="items">
                            <div>
                              <ul>
                                <li>
                                  <button class="edit" @click="(e) => toggleModify({ _id, target, name, value, order })">
                                    <span>수정</span>
                                  </button>                            
                                </li>
                                <li>
                                  <button class="double_up" @click="() => updateSetting({ _id, target, name, value, order, inc: -order })">
                                    <span>순서 가장 위로</span>
                                  </button>                            
                                </li>
                                <li>
                                  <button class="up" @click="() => updateSetting({ _id, target, name, value, order, inc: -1 })">
                                    <span>순서 위로</span>
                                  </button>                            
                                </li>
                                <li>
                                  <button class="down" @click="() => updateSetting({ _id, target, name, value, order, inc: 1 })">
                                    <span>순서 아래로</span>
                                  </button>                            
                                </li>                            
                                <li>
                                  <button class="double_down" @click="() => updateSetting({ _id, target, name, value, order, inc: settings.length - order - 1 })">
                                    <span>순서 가장 아래로</span>
                                  </button>                            
                                </li>
                              </ul>
                              <ul>
                                <li>
                                  <button class="remove" @click="() => removeSetting(_id)">
                                    <span>삭제</span>
                                  </button>
                                </li>                          
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                    </template>
                  </tr>
                  <tr v-if="add">
                    <td>
                      <v-input type="text" class="" name="name" placeholder="" :keyup="(e) => handleInput(e, 'add')" />
                    </td>
                    <td>
                      <v-input type="text" class="" name="value" placeholder="" :keyup="(e) => handleInput(e, 'add')" />
                    </td>
                    <td>
                      <v-flex>
                        <v-btn class="btn primary" :click="() => createSetting(add).then(() => toggleAdd())">
                          <span>저장</span>
                        </v-btn>
                        <v-btn class="btn" :click="() => toggleAdd()">
                          <span>취소</span>
                        </v-btn>                        
                      </v-flex>
                    </td>
                  </tr>                
                  <tr v-if="!add">
                    <td colspan="3">
                      <button class="add" @click="toggleAdd">
                        <span>추가</span>
                      </button>
                    </td>
                  </tr>            
                </tbody>
              </v-table>
            </div>
          </section>
        </v-scrollbar>
      </div>
    </v-fixed>
  </Layout>
</template>

<script>
import Layout from './TheLayout';
import { VFlex, VFixed, VScrollbar, VH2, VTable, VInput, VBtn } from './ui';

export default {
  components: {
    Layout,
    VFixed,
    VScrollbar,
    VFlex,
    VH2,
    VTable,
    VInput,
    VBtn
  },
  props: {
    settings: {
      type: Array,
      default() {}
    },
    createSetting: {
      type: Function,
      default() {}
    },
    updateSetting: {
      type: Function,
      default() {}
    },
    removeSetting: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      add: null,
      modify: null
    }
  },
  beforeMount() {
    $(window).on({
      keydown: function(e) {
        e.keyCode === 27 && $('.dropdown .items').removeClass('expanded');
      },
      click: function(e) {      
        const $parents = $(e.target).parents();
        if (!$parents.hasClass('dropdown') && !$parents.hasClass('ui-datepicker-header') && !$parents.hasClass('ui-datepicker-buttonpane')) {
          $('.dropdown .items').removeClass('expanded');
        }
      }
    });
  },
  methods: {
    toggleAdd() {
      if (this.add === null) {
        this.add = {
          target: 'note',
          name: '',
          value: '',
          order: this.settings.length
        }
      }
      else {
        this.add = null;
      }
    },
    handleInput(e, target) {
      const { name, value } = e.currentTarget;
      this[target][name] = value;
    },
    toggleModify(modify) {
      if (this.modify && this.modify._id === modify._id) {
        this.modify = null;        
      }
      else {
        this.modify = modify;
      }
    },
    handleDropdown(e) {      
      const $thisItems = $(e.currentTarget).next();

      if (!$thisItems.hasClass('expanded')) {
        $('.dropdown .items').each(function() {
          $thisItems !== $(this) && $(this).removeClass('expanded');
        });
      }    
      
      if (!$(e.currentTarget).hasClass('dialog')) {     
        const isOverHeight = function() {
          return $thisItems.offset().top + $thisItems.height() > $(window).height();
        }

        $thisItems.toggleClass('expanded').addClass(isOverHeight() ? 'over' : '');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fixed {
  height: 100%;
  header {
    > div {
      margin-bottom: 25px;
      padding: 0 30px;
      &:first-child {
        margin-bottom: 35px;
      }
    }
  }

}
.form {
  height: 100%;
  overflow: hidden;
  > div {
    display: flex;
    justify-content: space-between;
    height: 100%;
    overflow: hidden;
    > div {
      box-sizing: border-box;      
      &:first-child {        
        width: calc(100% - 405px);        
        section {
          padding: 0  15px 0 30px;
          &:last-child {
            padding-bottom: 35px;
          }
        }
      }
      &:last-child {
        width: 405px;        
        section {
          height: 100%;        
          padding-left: 15px;
          overflow: hidden;
          h3 {
            padding-bottom: 10px;           
          }
          > *:first-child {
            margin-right: 30px;
            border-bottom: $border-light;
            &.tabs {
              > * {
                margin: 0;
                width: 50%;
              }
            }
            + div {
              height: calc(100% - 31px);
            }
          }
        }
      }
    }
  }
  section {
    margin: 0 auto;    
    width: 720px;
    > div {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;      
      > div {
        width: 100%;
        &:nth-child(n+2) {
          margin-left: 24px;
        }
        // label {
        //   display: inline-block;        
        // }
        .required::before {
          content: '* ';
          color: $text-danger;
        }        
        input[type=text], select, textarea {
          width: 100%;
        }
        > div {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: 8px;
          label {
            margin-left: 4px;
          }
          ul {
            overflow: hidden;
            li {
              float: left;
              margin-right: 20px;
              label {
                display: block;
                line-height: 20px;   
              }
            }
          }
        }
      }
      + div {
        margin-top: 25px;
        &:nth-child(2) {
          margin-top: 12px;  
        }               
      }
    }
  }
  section {    
    + section {
      margin-top: 35px;
    }
    &:last-child {
      padding-bottom: 35px;
    }
  }  
}

h3 span {
  font-weight: 700;
  font-size: 16px;
  color: #28292B;
}

.table_expand {
  display: block;
  &.hidden {
    height: 1px;
    overflow: hidden;
  }
  table {    
    table-layout: fixed;
    tr {
      th {
        padding-left: 12px;
        height: 36px;
        text-align: left;
        background-color: $bg-secondary;
      }      
      td {
        position: relative;
        padding-left: 12px;
        border-bottom: $border-light;
        > span:first-child {
          @include ellipsis;
          width: calc(100% - 15px);
        }
        strong {
          color: $primary;
        }
        .add {
          display: block;
          margin: 0 auto;
          width: 32px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          border-radius: 32px;          
          background: url(~svg/ico_plus.svg) no-repeat center #D9E7FF;
          outline: none;
          span {
            font-size: 0;
          }
          &:focus {
            background-color: rgba(40, 113, 245, 0.3);
          }          
          &:disabled {
            background: url(~svg/ico_plus_disabled.svg) no-repeat center #F2F4F7;
          }
        }
        .hover {
          @include tooltip;
          &:hover {              
            + span {
              top: 47px;
              left: 5px;                
              &::before {
                content: '';
                left: 15px;
              }
            }
          }
        }
        .dropdown {
          > * {
            margin-right: 15px;
          }
        }
        input {
          width: 100%;
        }
      }
      &.detail {
        display: none;
        td {
          padding: 0 15px;
          height: 108px;
          background-color: #F7F9FC;
          > div {
            > div {    
              span {
                @include ellipsis;
                width: calc(100% - 15px);
                &:first-child {
                  display: block;                  
                  margin-bottom: 8px;
                  color: $text-secondary;
                }
              }
            }
            + div {
              //justify-content: start;
              margin-top: 15px;
            }          
          }
        }          
      } 
    }
    tbody {
      overflow: auto;
    }
  }
}

.dropdown {
  position: relative;
  text-align: right;
  .filter {
    display: flex;
    align-items: center;
    padding: 9px 15px;
    border: $border-dark;
    border-radius: 33px;    
    span {
      font-size: 14px;
      font-weight: 700;
      color: $text-dark;
      & + span {
        font-weight: 500;
        margin-left: 7px;
      }
    }
    &::after {
      content: '';
      position: relative;
      display: inline-block;
      margin-left: 5px;
      width: 8px;
      height: 4px;
      background: url(~svg/ico_caret_down.svg) no-repeat;
    }
    &.on {
      border-color: $primary;      
      span {
        color: $primary;
      }
      &::after {
        background-image: url(~svg/ico_caret_down_on.svg);
      }
    }
    + .items {
      top: 45px;
      left: 0;
    }
  }
  .ellipsis_h, .ellipsis_v {
    + .items {
      top: 25px;
      right: 0;
      &.over {
        top: auto;
        bottom: 25px;
      }
    }
  }
  .items {
    &.md {
      width: 210px;
    }
    &.lg {
      width: 430px;
      .flex {
        padding: 15px 25px 5px;
        &.between {
          align-items: center;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        &.end {
          border-top: $border-light;
        }
        > span {
          font-size: 16px;
          font-weight: 700;
          color: $text-dark;
        }
      }
      .search.global {
        margin-top: 10px;
        padding: 0 25px 0 50px;
        width: 100%;
        height: 44px;
        border-radius: 0;
        border-top: $border-light;
        border-width: 1px 0 0 0;
        background-position-x: 25px;
      }
    }    
    &:not(.expanded) {
      display: none;
    }
    position: absolute;    
    width: 190px;
    padding: 10px 0;
    border: $border-dark;
    border-radius: 5px;
    background: $white;
    box-shadow: 5px 5px 20px rgba(62, 63, 66, 0.12);
    z-index: 1;
    div {
      &:not(.selected_items) {
        &:not(.tree) {
          li {
            &:hover {
              background-color: #F2F4F7;
            } 
          }                 
        }        
        ul {
          position: relative;      
          li {      
            button {
              padding: 0 15px;
              width: 100%;
              height: 34px;
              text-align: left;
              span {
                vertical-align: top;
              }
              &.edit {
                @include icon(before, edit);
              }
              &.up {
                @include icon(before, arrow_up);
              }
              &.double_up {
                @include icon(before, arrow_double_up);
              }          
              &.down {
                @include icon(before, arrow_down);
              }          
              &.double_down {
                @include icon(before, arrow_double_down);
              }          
              &.remove{
                span {
                  color: $text-danger;
                }
                @include icon(before, remove);
              } 
            }
          }
          & + ul {
            margin-top: 10px;
            padding-top: 10px;
            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 15px;
              display: block;      
              width: calc(100% - 30px);
              height: 1px;          
              background-color: #EDEFF3;
            }
          }
        }
      }
      &.check {
        ul {
          li {
            padding: 0 15px;
            label {              
              display: block;
              height: 34px;
              line-height: 30px;
              span {
                vertical-align: middle;
                color: $text-dark;
              }
            }
          }
        }
      }      
      &.radio {
        ul {
          li {
            input[type=radio] {
              display: none;
              + label {
                display: block;
                padding-left: 38px;
                width: 100%;
                box-sizing: border-box;
                height: 34px;
                line-height: 34px;
                background: none;
                span {
                  color: $text-dark;
                }
              }
              &:checked {
                + label {
                  background: url(~svg/ico_check.svg) no-repeat left 15px center;
                  span {
                    color: $primary;
                  }
                }
              }
            }
          }
        }
      }     
      &.flex {
        padding: 5px 15px;
        .uncheck {
          span {
            color:  $text-danger;
          }
        }
      }
    }
  }
}

button {  
  // vertical-align: middle;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  &.ellipsis_h {
    @include icon(after, ellipsis_h);
    &::after {
      margin-left: 0;
    }
    &:disabled {
      @include icon(after, ellipsis_h_disabled);
    }
  }
  &.ellipsis_v {
    @include icon(after, ellipsis_v);
    &::after {
      margin-left: 0;
    }
    &:disabled {
      @include icon(after, ellipsis_v_disabled);
    }
  }
  &.close {
    @include icon(after, times);
  }
  span {
    position: relative;
  }
}
</style>