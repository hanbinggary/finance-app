<template>
  <div class="news" ref="menuWrapper">
    <div>
      <div class="weui-panel" v-for="(item,i) in newslist" :key="i" @click="goToNews(item.url)">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text">
            <img :src="item.picUrl" class="news-img" />
            <h4 class="weui-media-box__title">{{item.title}}</h4>
            <p class="weui-media-box__desc">{{item.title}}</p>
            <ul class="weui-media-box__info">
              <li class="weui-media-box__info__meta">{{item.description}}</li>
              <li class="weui-media-box__info__meta">{{item.ctime}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="weui-loadmore">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
      </div>
      <div class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无更多数据</span>
      </div>
      <div class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
        <span class="weui-loadmore__tips"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        newslist: []
      }
    },
    methods: {
      goToNews(url) {
        window.location = url
      },
      reqNews() {
        this.axios('/news?key=ccab71fd2aca2d3630f6b2d54465219f&num=10').then(res => {
          this.newslist = res.data.newslist
        })
      },
      initalScroll() {
        if(!this.menuScroller) {
          //避免内存泄露，当menuScroller存在时无需再实例化
          this.menuScroller = new BScroll(this.$refs.menuWrapper, {
            click: true,
          })
        } else {
          this.menuScroller.refresh()
        }
      },
      destroyScroll() {
        if(this.menuScroller) {
          this.menuScroller.destroy();
          this.menuScroller = null;
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.reqNews();
        this.initalScroll();
      })
    },
    beforeDestroy() {
      this.destroyScroll()
    }
  }
</script>

<style lang="scss">
  .news {
    width: 100vw;
    height: 100vh;
    .news-img {
      width: 50px;
      height: 50px;
      position: absolute;
      top: 25px;
    }
    h4,
    p {
      padding-left: 68px;
    }
  }
</style>