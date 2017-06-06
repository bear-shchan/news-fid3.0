<template>
  <div>
    <table class="table">
      <tr class="tr" v-for="item in list">
        <td class="td">
          <p>{{item.name}}</p>
          <span class="span">{{item.code}}</span>
        </td>
        <td class="td" :class="curColor">{{item.zxj}}</td>
        <td class="td" :class="curColor">{{item.zdf | toFixed}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    rankType: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get('/fidnews/v1/fid/queryZsBdList', {
        params: {
          code: this.$route.params.tagName,
          rankType: this.rankType,
          limit: 20,
          offset: 1
        }
      })
      .then((res) => {
        // console.log(res)
        this.$set(this, 'list', res.data)
      })
    }
  },
  computed: {
    curColor: function () {
      return this.rankType === 0 ? 'red' : 'green'
    }
  }
}
</script>

<style scoped>
.table{
  width: 100%;
}
.tr{
  font-size: 16px;
  color: #191919;
  line-height: 16px;
  text-align: center;
}
.td{
  padding-top: 0.5333rem;
  padding-bottom: 0.2667rem;
  width: 33.33%;
}
.span{
  font-size: 12px;
  color: #66667a;
  line-height: 15px;
}
.red{
  color: #e2666a;
}
.green{
  color: #4a9a69;
}
</style>
