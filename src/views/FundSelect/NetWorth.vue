<template>
  <div>
    <!-- <plate-header title="历史净值" type="gray" padding-left="0.85"></plate-header> -->
    <div class="fund-header">
      <p>{{main.name}}</p>
      <p>{{main.fundcode}}</p>
    </div>
    <i class="gray-line"></i>
    <table class="table"
      v-infinite-scroll="getMain"
      infinite-scroll-disabled="listBust" 
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="false">
      <thead>
        <tr>
          <th>日期</th>
          <th>单位净值</th>
          <th>累计净值</th>
          <th>日增长率</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in main.data">
          <td>{{item.date}}</td>
          <td>{{item.unitNet}}</td>
          <td>{{item.acNet}}</td>
          <td>{{item.dailyIncrRate}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PlateHeader from '@/components/PlateHeader'

export default {
  components: {
    PlateHeader
  },
  data () {
    return {
      main: {},
      pageNo: 1,
      listBust: false
    }
  },
  created () {
    this.getMain()
  },
  methods: {
    getMain: function () {
      let vm = this
      this.listBust = true
      this.$http.get('/fidnews/v1/themefund/hisnetworth/page', {
        params: {
          fundCode: vm.$route.params.id,
          pageNo: vm.pageNo,
          orderBy: 'date',
          order: 'desc'
        }
      })
      .then((data) => {
        if (vm.pageNo === 1) {
          vm.$set(vm, 'main', data)
        } else {
          for (let i = 0, len = data.data.length; i < len; i++) {
            vm.main.data.push(data.data[i])
          }
        }
        this.listBust = false
        vm.pageNo++
      })
    }
  }
}
</script>

<style scoped>
.gray-line::before{
  content: '';
  display: block;
  height: 0.14rem;
  background: #f3f3f3;
  width: 100%;
}

.fund-header{
  padding-left: 0.46rem;
  padding-top: 0.43rem;
  padding-bottom: 0.43rem;
  font-size: 15px;
  line-height: 15px;
}

.table{
  width:100%;
  border-collapse:collapse;
}
.table tr{
  border-bottom: 1px solid #eee;
}
.table th{
  font-size: 9px;
  color: #858585;
  line-height: 0.72rem;
  font-weight: normal;
}
.table td{
  font-size: 14px;
  line-height: 1.053rem;
  text-align: center;
  color: #ff4646;
}
.table td:first-of-type{
  color: #858585;
}
</style>
