<template>
  <div class="box">
    <div class="card">
      <p class="title">{{ data.gsmz }}</p>
      <p class="desc">{{ data.zcdz }}</p>
      <p class="data">上市日期：{{ data.ssrq }}</p>
      <p class="data">发行价格：{{ data.fxjg }}</p>
      <p class="data">发行数量：{{ data.fxs }}</p>
      <i class="block"></i>
      <i class="line"></i>
    </div>
    <div class="content-box">
      <p class="title">公司简介</p>
      <p class="zzyw">{{ data.zyyw }}</p>
    </div>
    <div class="content-box">
      <p class="title">主营收入构成</p>
      <echarts :option="incomePieOption" main='pie' class-name="income-pie-charts"></echarts>
      <ul class="income-list">
        <li class="income-list-item" v-for="(item, index) in incomeArr">
          <p class="income-list-item-title"><i class="icon" :style="{ backgroundColor: colorArr[index]}"></i>{{item.name}}</p>
          <p class="income-list-item-data">{{item.value + item.unit}}</p>
        </li>
      </ul>
    </div>
    <div class="content-box">
      <p class="title">十大流通股东</p>
      <table class="table">
        <thead>
          <tr>
            <th>股东名称</th>
            <th class="tac">占比</th>
            <th class="tac">变动</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data.gudong">
            <td class="name layout-box">
              <i class="icon" :style="{ backgroundColor: colorArr[index]}"></i><span class="box-col">
              {{ item.name }}</span>
            </td>
            <td class="tac">{{ item.holderPercent }}</td>
            <td class="tac">{{ item.changeType }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="content-box">
      <p class="title">股东股本</p>
      <ul class="list" v-if="data.guben">
        <li class="list-item">
          <span class="list-1">总股本</span>
          <span>{{ data.guben.zgb }}</span>
        </li>
        <li class="list-item">
          <span class="list-1">流通A股</span>
          <span>{{ data.guben.ltgb }}</span>
        </li>
        <li class="list-item">
          <span class="list-1">股东户数</span>
          <span>{{ data.guben.gdrs }}</span>
        </li>
        <li class="list-item">
          <span class="list-1">户均持股</span>
          <span>{{ data.guben.rjcg }}</span>
        </li>
      </ul>
    </div>
    <div class="content-box">
      <p class="title">分红送转</p>
      <ul class="list">
        <li class="list-item" v-for="item in data.fenhong">
          <span class="list-1">{{ item.fa }}</span>
          <span>{{ item.cqr }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Echarts from '@/components/Echarts'

export default {
  components: {
    Echarts
  },
  data () {
    return {
      data: {},
      colorArr: ['#f4ce46', '#cfda4c', '#77aa3c', '#78cbcf', '#7aa4d6', '#c9badb', '#fbc9be', '#f9b382',
        '#ffe994', '#afafb0', '#66667a'],
      incomePieOption: {},
      incomeArr: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.get('/fidnews/v1/geek/v2/queryFTen', {
        params: {
          windCode: this.$route.params.tagName
        }
      })
      .then((data) => {
        this.$set(this, 'data', data.data)
        this.setIncomePieEChartOption()
      })
    },
    setIncomePieEChartOption () {
      let arr = this.data.zysrgc

      let seriesData = arr.map((item, index) => {
        let newItem = {
          value: item.income,
          name: item.sector,
          unit: item.unit,
          itemStyle: {
            normal: {
              color: this.colorArr[index]
            }
          }
        }
        return newItem
      })
      seriesData = seriesData.splice(0, 5)
      this.incomeArr = seriesData

      let option = {
        series: [
          {
            type: 'pie',
            // center: ['50%', '60%'],
            radius: ['80%', '95%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            legendHoverLink: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: seriesData
          }
        ]
      }
      this.$set(this, 'incomePieOption', option)
    }
  }
}
</script>

<style scoped>
.tac{
  text-align: center;
}

.box{
  background-color: #f7f7f7;
  padding-top: 0.4rem;
  color: #2e2e37;
}
.card{
  position: relative;
  width: 92%;
  margin: 0 auto;
  padding-top: 0.8rem;
  padding-bottom: 0.67rem;
  text-indent: 0.72rem;
  background-color: #fff;
  border-radius: 10px;
}
.card .title{
  font-size: 17px;
}
.card .desc{
  font-size: 12px;
  line-height: 20px;
  color: #66667a;
  margin-bottom: 0.96rem;
}
.card .data{
  font-size: 12px;
  line-height: 18px;
}
.card .block{
  position: absolute;
  top: 0.92rem;
  display: block;
  width: 0.32rem;
  height: 1.04rem;
  background-color: #f4ce46;
}
.card .line{
  position: absolute;
  top: 1.5rem;
  right: 0;
  display: block;
  width: 37%;
  height: 1px;
  background-color: #f4ce46;
}

.content-box{
  margin-top: 0.4rem;
  padding-top: 0.4rem;
  padding-bottom: 0.53rem;
  background-color: #fff;
}
.content-box .title{
  font-size: 12px;
  color: #66667a;
  text-align: center;
  margin-bottom: 0.53rem;
}

.content-box .list{
  font-size: 14px;
}
.content-box .list-item{
  margin-top: 0.48rem;
}
.content-box .list-item:first-of-type{
  margin-top: 0;
}
.content-box .list-1{
  display: inline-block;
  text-indent: 0.67rem;
  width: 3.73rem;
}

.zzyw{
  font-size: 15px;
  width: 92%;
  margin: 0 auto;
  text-indent: 15px;
}

.table{
  border: 0;
  text-align: left;
  width: 92%;
  margin: 0 auto;
}
.table thead{
  font-size: 12px;
  color: #66667a;
}
.table .name{
  width: 5.33rem;
  /*align-items: baseline;*/
}
.table td{
  padding-top: 0.53rem;
  font-size: 14px;
  line-height: 19px;
}
.table tr:first-of-type td{
  padding-top: 0.27rem;
}

.icon{
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 0.13rem;
  border-radius: 50%;
  margin-top: 8px;
}

.income-pie-charts{
  width: 50%;
  display: inline-block;
  height: 2.8rem;
  vertical-align: top;
}
.income-list{
  display: inline-block;
}
.income-list-item+.income-list-item{
  margin-top: 0.67rem;
}
.income-list-item .income-list-item-title{
  font-size: 15px;
  color: #2e2e37;
}
.income-list-item .income-list-item-data{
  font-size: 12px;
  color: #66667a;
  text-indent: 0.27rem;
}
</style>
