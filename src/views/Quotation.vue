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
          <h2>A股指数</h2>
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
        hotSharesCode: ['s_sh000001', 's_sz399001', 's_sz399006', 's_sz399005', 's_sh000016', 's_sh000300',
          's_sz399933', 's_sz399995', 's_sz399971', 's_sz399440', 's_sh512480', 's_sz399989', 's_sz399998', 's_sh000827',
          's_sz399967', 's_sz399363', 's_sz399935', 's_sz399986', 's_sz399997', 's_sz399975'
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
      }
    },
    methods: {
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
            nowPrice: Number(arr[1]).toFixed(2), //现价
            upAndDown: Number(arr[2]).toFixed(2), //涨跌额
            percent: Number(arr[3]), //涨跌幅
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
    color: orange !important;
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
      .search-btn {
        position: absolute;
        top: 8px;
        right: 10px;
        font-size: 24px;
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