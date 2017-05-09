<template>
  <div class="box">
    <p>
      <span>日期：</span>
      <span class="date">{{ getEventItem.show_date }}</span>
    </p>
    <p class="layout-box">
      <span>事件：</span>
      <span class="box-col events">{{ getEventItem.events }}</span>
    </p>
    <p v-if="getEventItem.concept">
      <span>主题：</span>
      <span class="concept">{{ getEventItem.concept }}</span>
    </p>
    <p v-if="getEventItem.description !== '-'" class="layout-box">
      <span>解读：</span>
      <span class="box-col description">{{ getEventItem.description }}</span>
    </p> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getEventItem'])
  }
}
</script>
<style scoped>
.box{
  /*margin-top: 0.27rem;*/
  padding: 0 0.27rem;
  font-size: 16px;
  color: #424242;
}
p{
  padding: 0.1rem 0;
}
.concept{
  border: 1px solid #f4ce46;
  color: #f4ce46;
  padding: 0 0.25rem;
  vertical-align: text-top;
}
.description{
  color: #aaa;
}
</style>
