<template>
  <div class="foot">
    <div class="bottom_pannel">
      <a href="//a.app.qq.com/o/simple.jsp?pkgname=com.gohoc.afinancegeek">
        <div class="top_logo ">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTc5MDlGNzk1MDEwMTFFNzk1QkVGMTUwOTZCNDM0MDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTc5MDlGN0E1MDEwMTFFNzk1QkVGMTUwOTZCNDM0MDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NzkwOUY3NzUwMTAxMUU3OTVCRUYxNTA5NkI0MzQwMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NzkwOUY3ODUwMTAxMUU3OTVCRUYxNTA5NkI0MzQwMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp1NLhIAAArvSURBVHja3FoLcFTl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">
        </div>
        <div class="bottom_lable ">
          <p class="bottom_t">飞笛智投</p>
          <p class="bottom_tsub">让投资更智慧</p>
        </div>
        <span class="loadapp">立即下载</span>
      </a>
    </div>
  </div>
</template>
<style scoped>
  .foot {
    padding-top: 1.33rem;
  }
  .bottom_pannel{
    width: 100%;
    height: 1.33rem;
    position: fixed;
    bottom:0px;
    background: rgba(0,0,0,.5); 
    z-index: 1000;
  }
  .top_logo{
    width: 1.15rem;
    height: 1.15rem;
    background-size:1.15rem 1.15rem;
    position: absolute;
    top: 0.09rem;
    left: 0.32rem;
  }
  .top_logo img {
    width: 1.15rem;
    height: 1.15rem;
  }
  .bottom_pannel a{
    text-align: middle;
  }
  .bottom_lable{
    position: absolute;
    left: 1.63rem;
    top: 0.13rem; 
  }
  .bottom_t{
    font-size: 15px;
    color: #f7f7f7;
  }
  .bottom_tsub{
    font-size: 10px;
    color: #f7f7f7;
  }
  .loadapp {
    position: absolute;
    right: 0.32rem;
    top: 0.35rem;
    color: #2e2e37;
    background-color: #f4ce46;
    border: 1px solid #f4ce46;
    padding: 0.08rem 0.13rem;
  }
</style>
