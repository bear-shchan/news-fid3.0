<template>
  <div>
    <table class="table">
      <tr class="tr">
        <td class="td">
          <p>中电电机</p><span class="span">603988</span>
        </td>
        <td class="td red">80.10</td>
        <td class="td red">1.13%</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    // this.getList()
  },
  methods: {
    getList () {
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
</style>
