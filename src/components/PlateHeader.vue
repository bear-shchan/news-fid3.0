<template>
  <div>
    <div v-if="grayLine" class="gray-line"></div>
  <!--   <div class="box">
      <span class="title">{{title}}</span>
      <span v-if="!!path" class="see-more" @click="jumpDetail()">
        查看更多>>
      </span>
    </div> -->

    <div v-if="type === 'gray'" class="gray-box" :style="{ paddingLeft: paddingLeft + 'rem' }">
      <span class="title">{{title}}</span>
      <span v-if="!!path" class="see-more" @click="jumpDetail()">
        查看更多>>
      </span>
    </div>
    <div v-else-if="type === 'high'" class="high-box">
      <span class="title">{{title}}</span>
      <span v-if="!!path" class="see-more" @click="jumpDetail()">
        查看更多>>
      </span>
    </div>
    <div v-else class="box">
      <span class="title">{{title}}</span>
      <span v-if="!!path" class="see-more" @click="jumpDetail()">
        查看更多>>
      </span>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  data () {
    return {
    }
  },
  methods: {
    jumpDetail () {
      router.push(this.path)
    }
  },
  props: {
    title: String,
    grayLine: Boolean,
    path: String, // url
    paddingLeft: String,
    type: String
  }
}
</script>

<style scoped>
.box{
  padding: 0.28rem 0.28rem 0.28rem 0.36rem;
  border-bottom: 1px solid #eee;
}
.gray-box{
  line-height: 1.26rem;
  padding-left: 0.28rem;
  background: #f3f3f3;
  font-size: 15px;
}
.high-box{
  padding: 0.43rem 0.28rem 0.43rem 0.36rem;
}
.title{
  font-size: 15px;
  line-height: 15px;
  color: #000;
}
.see-more{
  font-size: 14px;
  color: #ff5367;
  float: right;
}
</style>
