<template>
  <div class="box">
    <p class="item">
      <span class="ht">日期：</span>
      <span class="date">{{ getCalendarItem.show_date }}</span>
    </p>
    <p class="item">
      <span class="ht">国家：</span>
      <span class="events">{{ getCalendarItem.country }}</span>
    </p>
    <p class="layout-box item">
      <span class="ht">指示名称：</span>
      <span class="box-col concept">{{ getCalendarItem.item }}</span>
    </p>
    <p class="item">
      <span class="ht">重要性：</span>
      <span class="importance-star" :class="'importance-' + getCalendarItem.importance "></span>
    </p>
    <p class="item">
      <span class="ht">前值：</span>
      <span>{{ getCalendarItem.pre_value }}</span>
    </p>
    <p class="item">
      <span class="ht">公布值：</span>
      <span class="orange">{{ getCalendarItem.real_value }}</span>
    </p>
    <p class="item">
      <span class="ht">预测值：</span>
      <span>{{ getCalendarItem.forecast_value }}</span>
    </p>
    <div class="layout-box item">
      <span class="ht">利多利空：</span>
      <ul class="box-col">
        <li class="rectangle rectangle-green">
          <span class="rectangle-title">利多</span>
          <span class="rectangle-desc" v-if="getCalendarItem.good">{{ getCalendarItem.good }}</span>
          <span class="rectangle-desc" v-else>--</span>
        </li>
        <li class="rectangle rectangle-red">
          <span class="rectangle-title">利空</span>
          <span class="rectangle-desc" v-if="getCalendarItem.bad">{{ getCalendarItem.bad }}</span>
          <span class="rectangle-desc" v-else>--</span>
        </li>
      </ul>
    </div>
    <div class="layout-box reading-box item">
      <span class="ht">解读：</span>
      <div class="box-col">
        <!-- {{ getCalendarItem.description }} -->
        <p class="st">主指标数据释义</p>
        <p class="tt">{{ getCalendarItem.description_paraphrase }}</p>
        <p class="st">主指标关注原因</p>
        <p class="tt">{{ getCalendarItem.description_reason }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  created () {
    this.SET_SPINNER(false)
  },
  methods: {
    ...mapActions(['SET_SPINNER'])
  },
  computed: {
    ...mapGetters(['getCalendarItem'])
  }
}
</script>
<style scoped>
.box{
  padding-left: 0.27rem;
  padding-right: 0.27rem;
  font-size: 14px;
  color: #424242;
}
.item{
  padding-top: 0.2rem;
}
.description{
  color: #aaa;
}
.ht{
  width: 24%;
  display: inline-block;
  text-align: right;
}

.orange{
  color: orange;
}
.rectangle{
  width: 50%;
  font-size: 12px;
}
.rectangle .rectangle-title{
  width: 25%;
  text-align: center;
  color: #fff;
  display: inline-block;
}
.rectangle-green{
  border: 1px solid green;
}
.rectangle-red{
  margin-top: 0.3rem;
  border: 1px solid red;
}
.rectangle-green span{
  background: green;
}
.rectangle-red span{
  background: red;
}
.rectangle .rectangle-desc{
  background: #fff;
}

.importance-1{
  background: url('../../assets/img/important1.png') no-repeat;
}
.importance-2{
  background: url('../../assets/img/important2.png') no-repeat; 
}
.importance-3{
  background: url('../../assets/img/important3.png') no-repeat;
}
.importance-star{
  width: 1.92rem;
  height: 0.53rem;
  display: inline-block;
  background-size: cover;
  vertical-align: text-bottom;
}

.reading-box{
  margin-top: 0.3rem;
}
.reading-box.item{
  margin-top: -0.2rem;
}
.reading-box .st{
  color: #000;
}
.reading-box .tt{
  color: #aaa;
  padding: 0.25rem 0;
  margin-bottom: 0.5rem;
}
</style>
