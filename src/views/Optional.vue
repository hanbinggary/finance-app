<template>
  <div class="optional">
    <h2>自选</h2>
    <p>
      <span>股票名</span>
      <span>最新价</span>
      <span>涨跌额</span>
      <span>涨跌幅</span>
    </p>
    <router-link v-for="item in optShares" :key="item.shareCode" class="share-item" :to="{name:'ShareDetails',params:{'shareCode':item.shareCode}}">
      <span :class="mineOpt.indexOf(item.shareCode)>(-1)?'mine-opt':''">
          {{item.shareName}}
          <p>{{item.shareCode}}</p>
        </span>
      <span :class="item.percent<0?'green':'red'">{{item.nowPrice}}</span>
      <span :class="item.percent<0?'green':'red'">{{item.upAndDown}}</span>
      <span :class="item.percent<0?'green':'red'">{{item.percent}}%</span>
    </router-link>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        optShares: []
      }
    },
    computed: {
      ...mapState({
        mineOpt: state => state.mineOpt,
      })
    },
    mounted() {
      this.mineOpt.forEach(code => {
        if(code.match('s_')) { //判断是指数还是个股
          this.axios(`/sina/list=${code}`).then(res => {
            let str = res.data.split('"')[1]
            let arr = str.split(',')
            this.optShares.push({
              shareCode: code, //股票代码
              shareName: arr[0], //股票名
              nowPrice: Number(arr[1]).toFixed(2), //现价
              upAndDown: Number(arr[2]).toFixed(2), //涨跌额
              percent: Number(arr[3]), //涨跌幅
            })
          })
        } else {
          this.axios(`/sina/list=${code}`).then(res => {
            let str = res.data.split('"')[1]
            let arr = str.split(',')
            this.optShares.push({
              shareCode: code, //股票代码
              shareName: arr[0], //股票名
              nowPrice: arr[3], //现价
              percent: ((Number(arr[3]) - Number(arr[2])) / Number(arr[2]) * 100).toFixed(2), //涨跌幅
              upAndDown: (Number(arr[3]).toFixed(2) - Number(arr[2]).toFixed(2)).toFixed(2), //涨跌额
            })
          })
        }

      })
    }
  }
</script>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .optional {
    background-color: #000000;
    color: #eee;
    font-size: 14px;
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
</style>