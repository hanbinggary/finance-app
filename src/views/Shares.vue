<template>
  <div class="shares">
    <div class="header">
      <div class="weui-search-bar" id="searchBar">
        <input type="search" class="weui-search-bar__input" @keydown.enter="queryShare(shareCode)" v-model="shareCode" id="searchInput" placeholder="请输入股票代码例：sh600519" required="">
        <i class="weui-icon-search search-btn" @click="queryShare(shareQueryCode)"></i>
      </div>
    </div>
    <div class="menuWrapper" ref="menuWrapper">
      <div>
        <div class="search-result">
          <router-link class="search-list" v-for="(item,i) in shareData" :key="i" tag='div' :to="{name: 'ShareDetails',params:{'shareCode':item.shareCode}}">

            <span>{{item.shareName}}</span>
            <span>{{item.nowPrice}}</span>
            <span>{{item.upAndDown}}</span>
            <span>{{item.percent}}%</span>
            <span class="icon-close" @click.stop="delShare(item.shareCode)"></span>
          </router-link>
        </div>

        <div class="hot-share">
          <h2>热门个股</h2>
          <p>
            <span>股票名</span>
            <span>最新价</span>
            <span>涨跌额</span>
            <span>涨跌幅</span>
          </p>
          <router-link v-for="item in hotShare" :key="item.shareCode" class="share-item" tag='div' :to="{name: 'ShareDetails',params:{'shareCode':item.shareCode}}">
            <span :class="mineOpt.indexOf(item.shareCode)>(-1)?'mine-opt':''">
          {{item.shareName}}
          <p>{{item.shareCode}}</p>
        </span>
            <span :class="item.percent<0?'green':'red'">{{item.nowPrice}}</span>
            <span :class="item.percent<0?'green':'red'">{{item.upAndDown}}</span>
            <span :class="item.percent<0?'green':'red'">{{item.percent}}%</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        shareCode: '',
        shareData: [],
        hotSharesCode: ['sh600519', 'sh603288', 'sh600036', 'sz000858', 'sz300015',
          'sz300760', 'sz002475', 'sh603005', 'sz000636', 'sh600536', 'sz000725', 'sh603985',
          'sh600030', 'sh601688', 'sz300527', 'sz002460', 'sz300750', 'sz002594', 'sz300529', 'sz002739'
        ],
        hotShare: [],
      }
    },
    computed: {
      ...mapState({
        mineOpt: state => state.mineOpt
      }),
      shareQueryCode() {
        return this.shareCode
      },
    },
    methods: {
      delShare(code) {
        this.shareData = this.shareData.filter(s => s.shareCode != code)
      },
      queryShare(code) {
        this.axios(`/sina/list=${code}`).then(res => {
          let str = res.data.split('"')[1]
          let arr = str.split(',')
          if(code.match('s_')) { //判断查询的是指数还是个股
            this.shareData.push({
              shareCode: code, //股票代码
              shareName: arr[0], //股票名
              nowPrice: Number(arr[1]).toFixed(2), //现价
              upAndDown: Number(arr[2]).toFixed(2), //涨跌额
              percent: Number(arr[3]), //涨跌幅
            })
          } else {
            this.shareData.push({
              shareCode: code, //股票代码
              shareName: arr[0], //股票名
              nowPrice: arr[3], //现价
              percent: ((Number(arr[3]) - Number(arr[2])) / Number(arr[2]) * 100).toFixed(2), //涨跌幅
              upAndDown: (Number(arr[3]).toFixed(2) - Number(arr[2]).toFixed(2)).toFixed(2), //涨跌额
            })
          }
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
        this.initalScroll();
      })
      this.hotSharesCode.forEach(code => {
        this.axios(`/sina/list=${code}`).then(res => {
          let str = res.data.split('"')[1]
          let arr = str.split(',')
          this.hotShare.push({
            shareCode: code, //股票代码
            shareName: arr[0], //股票名
            nowPrice: arr[3], //现价
            percent: ((Number(arr[3]) - Number(arr[2])) / Number(arr[2]) * 100).toFixed(2), //涨跌幅
            upAndDown: (Number(arr[3]).toFixed(2) - Number(arr[2]).toFixed(2)).toFixed(2), //涨跌额
          })
        })
      })
    },
    beforeDestroy() {
      this.destroyScroll()
    }
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  
  .mine-opt {
    color: orange;
  }
  
  .red {
    color: red !important;
  }
  
  .green {
    color: limegreen !important;
  }
  
  .shares {
    padding-bottom: 60px;
    .header {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      input {
        width: 100%;
        height: 40px;
        outline: none;
        border-radius: 10px;
      }
      .search-btn {
        position: absolute;
        top: 8px;
        right: 10px;
        width: 40px;
        height: 40px;
        color: red;
      }
    }
    .menuWrapper {
      width: 100vw;
      height: 100vh;
    }
    .search-result {
      width: 100%;
      margin-top: 56px;
      .search-list {
        width: 100%;
        display: flex;
        border-bottom: 1px solid #666;
        position: relative;
        background-color: #ccc;
        span {
          flex: 1;
        }
        .icon-close {
          position: absolute;
          color: red;
          top: 5px;
          right: 10px;
        }
      }
    }
    .hot-share {
      background-color: #000000;
      color: #eee;
      font-size: 14px;
      padding: 50px 0;
      h2 {
        font-size: 16px;
        background-color: #EEEEEE;
        color: red;
        padding-left: 10px;
      }
      p {
        display: flex;
        span {
          flex: 1;
          padding-left: 10px;
          border-bottom: 1px solid #666;
        }
      }
      .share-item {
        display: flex;
        height: 40px;
        span {
          flex: 1;
          padding-left: 10px;
          margin-top: 7px;
          color: #fff;
          p {
            color: #C0C0C0;
            font-weight: normal;
            font-size: 10px;
          }
          &:first-of-type {
            font-weight: bold;
            margin-top: 0;
          }
        }
      }
    }
  }
</style>