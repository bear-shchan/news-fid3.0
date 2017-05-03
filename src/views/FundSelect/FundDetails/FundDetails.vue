<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <img class="header-img" 
        :src="'http://120.76.76.152/mfs' + main.img"
        v-if="main.img != '-'">
      <div class="header-translucent"></div>
      <p class="header-name">{{main.name}}</p>
      <p class="header-code">({{main.fundCode}})<span> {{main.fundTypes[0]}}</span></p>
      <div>
        <span class="header-tag" v-for="item in main.tags">
          {{item}}
        </span>
      </div>
    
      <div class="header-data-box">
        <div>
          <p>日涨幅</p>
          <p class="header-data">{{main.dailyIncrRate}}</p>
        </div>
        <div class="unitNet-box">
          <p>净值<span></span></p>
          <p class="header-data">{{main.unitNet}}</p>
        </div>
        <div class="line"></div>
        <router-link tag="div" :to="'/historyNetWorth/' + main.fundCode" class="data-btn">
          <p class="data-text">历史<br />净值</p>
        </router-link>
      </div>
    </div>
    <!-- 走势图 -->
    <fund-details-echats></fund-details-echats> 
    <!-- 业绩排名 -->
    <plate-header title="业绩排名" type="gray"></plate-header>
    <table class="table">
      <thead>
        <tr>
          <th>时间</th>
          <th>收益回报</th>
          <th>同类排名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in curAchieveRank">
          <td>{{item.date}}</td>
          <td>{{item.returnRate}}</td>
          <td>{{item.rank}}</td>
        </tr>
      </tbody>
    </table>
    <div class="unfold" @click="unfoldInfo('unfoldAchieveRank')">
      <template v-if="unfoldAchieveRank">
        收起<i class="unfold-img upfold-up"></i>
      </template>
      <template v-else>
        展开<i class="unfold-img upfold-down"></i>
      </template>
    </div>
    <!-- 基金档案 -->
    <plate-header title="基金档案" type="gray"></plate-header>
    <plate-header title="基金信息"></plate-header>
    <div class="fund-Info">
      <p>基金规模<span class="fr">{{(main.doc.fund.scale).split('（')[0]}}</span></p>
      <p>成立时间<span class="fr">{{main.doc.fund.esDate}}</span></p>
      <p>基金公司<span class="fr">{{main.doc.fund.fundCompany}}</span></p>
    </div>
    <plate-header title="基金经理" :gray-line="true"></plate-header>
    <div class="fund-manager">
      <template v-for="item in main.doc.manager">
        <p class="fund-manger-name">{{item.name}}</p>
        <p class="fund-data-box">
          <span class="c-gray">从业时间</span>
          <span>{{item.cumTenureTime}}</span>
          <span class="line">|</span>
          <span class="c-gray">从业年均回报</span>
          <span class="c-red">{{item.repayYearly}}</span>
        </p>
      </template>
    </div>
    <plate-header title="资金配置" :gray-line="true"></plate-header>
    <echarts :option="pieOption" main='pie' class-name="pie-charts"></echarts>
    <template v-if="curIngredient[0]">
      <plate-header title="股票成分" type="high"></plate-header>
      <div class="stock-ingredient">
        <div class="stock-ingredient-item" v-for="item in curIngredient">
          <p>
            <span class="stock-ingredient-industry">{{item.industryType}}</span>
            <span class="fr">{{item.netWorthRatio}}</span>
          </p>
        </div>
      </div>
      <div class="unfold" 
        @click="unfoldInfo('unfoldIngredient')"
        v-if="main.doc.sectorAllocation.length > 3">
        <template v-if="unfoldIngredient">
          收起<i class="unfold-img upfold-up"></i>
        </template>
        <template v-else>
          展开<i class="unfold-img upfold-down"></i>
        </template>
      </div>
    </template>
    <plate-header title="相关主题" type="gray" v-if="main.relatedTopic[0]"></plate-header>
    <div class="related-topic layout-box">
      <router-link tag="div" :to="'/fundSelectDetails/' + item.latestNewsId "
        class="related-topic-item box-col"
        v-for="item in main.relatedTopic"
        key="item.topic">
        <p>{{item.topic}}</p>
        <p class="c-red">{{item.matchDegree}}</p>
      </router-link>
    </div>
    <template v-if="curPosition[0]">
      <plate-header title="重仓持股" type="gray"></plate-header>
      <table class="table">
        <thead>
          <tr>
            <th>持仓股</th>
            <th>占比</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in curPosition">
            <td>{{item.stockName}}</td>
            <td>{{item.netWorthRatio}}</td>
          </tr>
        </tbody>
      </table>
      <div class="unfold" 
        @click="unfoldInfo('unfoldPosition')"
        v-if="main.position.length > 3">
        <template v-if="unfoldPosition">
          收起<i class="unfold-img upfold-up"></i>
        </template>
        <template v-else>
          展开<i class="unfold-img upfold-down"></i>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import Echarts from '@/components/Echarts.vue'
import PlateHeader from '@/components/PlateHeader'
import FundDetailsEchats from './components/FundDetailsEchats'

// import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Echarts,
    PlateHeader,
    FundDetailsEchats
  },
  data () {
    return {
      main: {},
      unfoldAchieveRank: false,
      unfoldPosition: false,
      unfoldIngredient: false,
      pieOption: {}
    }
  },
  created () {
    this.getMain()
  },
  methods: {
    getMain: function () {
      let vm = this
      this.$http.get('/fidnews/v1/themefund/fundInfo', {
        params: {
          fundCode: vm.$route.params.id
        }
      })
      .then((data) => {
        vm.$set(vm, 'main', data.data)
        vm.setPieEChartOption()
      })
    },
    setPieEChartOption: function () {
      let assetAllocation = this.main.doc.assetAllocation

      let total = (+assetAllocation.share.split('%')[0]) +
        (+assetAllocation.currency.split('%')[0]) +
        (+assetAllocation.bond.split('%')[0])
      // console.log(total)

      let calculate = function (i) {
        if (total > 100) {
          return ((i.split('%')[0] * 100) / total).toFixed(2) + '%'
        } else {
          return i
        }
      }
      let assetsShare = calculate(assetAllocation.share)
      let assetsCurrency = calculate(assetAllocation.currency)
      let assetsBond = calculate(assetAllocation.bond)

      let share = '股票 ' + assetsShare
      let currency = '货币 ' + assetsCurrency
      let bond = '债券 ' + assetsBond

      let option = {
        legend: {
          orient: 'vertical',
          selectedMode: false,
          // itemWidth: 14,
          // x: 'right',
          left: '50%',
          top: '20%',
          data: [
            {
              name: share,
              icon: 'circle',
              textStyle: {
                fontSize: 15
              }
            },
            {
              name: currency,
              icon: 'circle',
              textStyle: {
                fontSize: 15
              }
            },
            {
              name: bond,
              icon: 'circle',
              textStyle: {
                fontSize: 15
              }
            }
          ]
        },
        series: [
          {
            type: 'pie',
            center: ['30%', '50%'],
            radius: ['50%', '80%'],
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
            data: [
              {
                name: share,
                value: assetAllocation.share.split('%')[0],
                itemStyle: {
                  normal: {
                    color: '#4eb5f7'
                  }
                }
              },
              {
                name: currency,
                value: assetAllocation.currency.split('%')[0],
                itemStyle: {
                  normal: {
                    color: '#8197d8'
                  }
                }
              },
              {
                name: bond,
                value: assetAllocation.bond.split('%')[0],
                itemStyle: {
                  normal: {
                    color: '#fb8962'
                  }
                }
              }
            ]
          }
        ]
      }
      this.$set(this, 'pieOption', option)
    },
    unfoldInfo: function (attr) {
      this[attr] = !this[attr]
    }
  },
  computed: {
    curAchieveRank () {
      if (this.unfoldAchieveRank) {
        return this.main.achieveRank
      }
      return this.main.achieveRank.slice(0, 3)
    },
    curPosition () {
      if (this.unfoldPosition) {
        return this.main.position
      }
      return this.main.position.slice(0, 3)
    },
    curIngredient () {
      if (this.unfoldIngredient) {
        return this.main.doc.sectorAllocation
      }
      return this.main.doc.sectorAllocation.slice(0, 3)
    }
  }
}
</script>

<style scoped>
.unfold{
  text-align: center;
  color: #66acf5;
  line-height: 0.94rem;
  border-top: 1px solid #eee;
}
.unfold-img{
  display: inline-block;
  width: 0.35rem;
  height: 0.19rem;
  margin-left: 2px;
  background-size: contain;
  background-repeat: no-repeat;
}
.upfold-down{
  /*background-image: url('@/assets/img/unfold.jpg');*/
}
.upfold-up{
  /*background-image: url('@/assets/img/unfold-up.jpg');*/
}
.c-gray{
  color: #858585;
}
.c-red{
  color: #ff5367;
}

.header{
  position: relative;
  height: 5.2rem;
  padding-top: 0.8rem;
  padding-left: 0.7rem;
  color: #fff;

  /*background: #ccc;*/
}
.header-img{
  position: absolute;
  top: 0;
  left: 0;
  height: 6rem;
  width: 100%;
  z-index: -9999;
}
.header-translucent{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  background: #000;
  opacity: .5;
}
.header-name{
  position: relative;
  font-size: 18px;
  width: 9.18rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.header-code{
  position: relative;
  font-size: 14px;
  line-height: 0.98rem;
}
.header-tag{
  position: relative;
  font-size: 12px;
  border: 1px solid #fff;
  border-radius: 3px;
  padding: 0 0.09rem 0.04rem;
  margin-right: 0.09rem;
}

.header-data-box{
  position: relative;
  margin-top: 0.675rem;
  font-size: 12px;
}
.header-data{
  font-size: 24px;
  color: #ff5367;
  line-height: 0.81rem;
}
.unitNet-box{
  position: absolute;
  left: 5.4rem;
  top: 0;
}
.header-data-box .line{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  background: #fff;
  width: 1px;
  margin-left: -1px;
}
.data-btn{
  position: absolute;
  right: 0.36rem;
  bottom: 0.08rem;
  text-align: center;
  background: #ff5367;
  border-radius: 50%;
  line-height: 0.38rem;
  vertical-align:middle;
  font-size: 0.35rem;
  height: 1.2rem;
  width: 1.2rem;
}
.data-btn .data-text{
  margin-top: 0.2rem;
}
/*
  业绩排名
 */
.table{
  width: 91.2%;
  border-collapse:collapse;
  margin-left: 4.4%;
  margin-right: 4.4%;
}
.table tr{
  border-top: 1px solid #eee;
}
.table thead tr{
  border-top: 0;
}
.table th{
  font-size: 9px;
  color: #858585;
  line-height: 0.72rem;
  font-weight: normal;
}
.table td{
  font-size: 14px;
  line-height: 1.05rem;
  text-align: center;
  color: #ff4646;
}
.table td:first-of-type{
  color: #858585;
}
/*
  基金信息
 */
.fund-Info{
  font-size: 15px;
  color: #858585;
  padding: 0.13rem 0.57rem 0.27rem;
}
.fund-manager{
  padding: 0.13rem 0.57rem 0.27rem;
}
.fund-manger-name{
  margin-top: 0.405rem;
}
.fund-manger-name:first-of-type{
  margin-top: 0.1rem;
}
.fund-data-box{
  font-size: 12px;
  margin-top: 0.043rem;
}
.fund-data-box .line{
  margin: 0 0.54rem;
  color: #858585;
  width: 1px;
  height: 100%;
}
/*
  资金配置
 */
.pie-charts{
  width: 100%;
  height: 3.88rem;
}
.stock-ingredient{
  padding-left: 0.54rem;
  padding-right: 0.54rem;
  padding-bottom: 0.22rem;
  font-size: 15px;
  color: #5f5f5f;
}
.stock-ingredient-industry{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 78%;
  display: inline-block;
}
.stock-ingredient-item .fr{
  float: right;
}
/* 
  相关主题
 */
.related-topic{
  background: #f3f3f3;
  font-size: 15px;
}
.related-topic-item{
  margin-left: 0.14rem;
  padding-top: 0.43rem;
  padding-bottom: 0.28rem;
  text-align: center;
  background: #fff;
  line-height: 19px;
}
.related-topic-item:first-of-type{
  margin-left: 0;
}
</style>
