<template>
  <div class="box">
    <div class="details-hd">
      <h1 v-html="main.title"></h1>
      <p class="date">
        {{ main.releasedDate | moment('YYYY-MM-DD HH:mm') }}
      </p>
    </div>
    <div class="details-content">
      <div v-html="main.contentTxt || main.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    main: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.box{
  min-height: 100vh;
  padding-top: 0.53rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-bottom: 0.53rem;
}
.details-hd h1{
  font-size: 24px;
  color: #2e2e37;
  line-height: 31px;
}
.date{
  font-size: 12px;
  color: #83839d;
  margin-top: 0.53rem;
  /*border-bottom: 1px solid #eee;*/
  margin-bottom: 0.4rem;
}
.details-content{
  /*text-indent: 32px;*/
  font-size: 16px;
  color: #4d4d4d;
}
</style>
