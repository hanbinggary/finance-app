<template>
  <div class="share-details">
    <!--头部-->
    <div class="header">
      <span class="ret-btn icon-back" @click="$router.go(-1)"></span>
      <span class="details-name">
        <h2 v-if="shareInfor.shareName">{{shareInfor.shareName}}</h2>
        <p v-if="shareInfor.shareCode">{{shareInfor.shareCode}}</p>
      </span>
      <span class="search-btn icon-search"></span>
    </div>
    <!--股票信息-->
    <div class="share-infor">
      <div class="share-price" :class="shareInfor.percent<0?'green':'red'">
        <h1>{{shareInfor.nowPrice}}</h1>
        <p>
          <span>{{shareInfor.percent}}%</span>
          <span>{{shareInfor.upAndDown}}</span>
        </p>
      </div>
      <tr>
        <td>今开</td>
        <td :class="shareInfor.todayStartPrice<shareInfor.lastDayEndPrice?'green':'red'">{{shareInfor.todayStartPrice}}</td>
        <td>最高</td>
        <td :class="shareInfor.todayMaxPrice<shareInfor.lastDayEndPrice?'green':'red'">{{shareInfor.todayMaxPrice}}</td>
        <td>最低</td>
        <td :class="shareInfor.todayMinPrice<shareInfor.lastDayEndPrice?'green':'red'">{{shareInfor.todayMinPrice}}</td>
      </tr>
      <tr>
        <td>换手</td>
        <td>--</td>
        <td>总手</td>
        <td>{{shareInfor.volume}}万</td>
        <td>金额</td>
        <td>{{shareInfor.turnover}}亿</td>
      </tr>
      <tr>
        <td>总值</td>
        <td>--</td>
        <td>流值</td>
        <td>--</td>
        <td>市盈</td>
        <td>--</td>
      </tr>
    </div>
    <!--K线图-->
    <div class="k-line">
      <ul class="k-ul">
        <li :class="{active:toggleActive==0}" @click="toggleTab(0)">分时</li>
        <li :class="{active:toggleActive==1}" @click="toggleTab(1)">五日</li>
        <li :class="{active:toggleActive==2}" @click="toggleTab(2)">日K</li>
        <li :class="{active:toggleActive==3}" @click="toggleTab(3)">周K</li>
        <li :class="{active:toggleActive==4}" @click="toggleTab(4)">月K</li>
        <li>
          <span class="icon-favorite" @click="changeOpt(shareInfor.shareCode)" :class="mineOpt.indexOf(shareInfor.shareCode)>(-1)?'mine-opt':''"></span>
        </li>
      </ul>
      <ul class="k-line-chat">
        <li v-show="toggleActive==0">
          <iframe v-if="shareInfor.shareCode" :src='"http://image.sinajs.cn/newchart/min/n/"+shareInfor.shareCode+".gif"' height="320" width="100%" frameborder="no"></iframe>
          <span v-if="!shareInfor.shareCode">暂无分时数据</span>
        </li>
        <li v-show="toggleActive==1">该证券暂不支持此数据</li>
        <li v-show="toggleActive==2">
          <iframe v-if="shareInfor.shareCode" :src='`http://image.sinajs.cn/newchart/daily/n/${(shareInfor.shareCode).match("s_")?(shareInfor.shareCode).substr(2):shareInfor.shareCode}.gif`' height="320" width="100%" frameborder="no"></iframe>
          <span v-if="!shareInfor.shareCode">暂无日K数据</span>
        </li>
        <li v-show="toggleActive==3">
          <iframe v-if="shareInfor.shareCode" :src='`http://image.sinajs.cn/newchart/weekly/n/${(shareInfor.shareCode).match("s_")?(shareInfor.shareCode).substr(2):shareInfor.shareCode}.gif`' height="320" width="100%" frameborder="no"></iframe>
          <span v-if="!shareInfor.shareCode">暂无周K数据</span>
        </li>
        <li v-show="toggleActive==4">
          <iframe v-if="shareInfor.shareCode" :src='`http://image.sinajs.cn/newchart/monthly/n/${(shareInfor.shareCode).match("s_")?(shareInfor.shareCode).substr(2):shareInfor.shareCode}.gif`' height="320" width="100%" frameborder="no"></iframe>
          <span v-if="!shareInfor.shareCode">暂无月K数据</span>
        </li>
      </ul>
    </div>
    <!--五档明细-->
    <div class="five-detail">
      <div class="sell-detail">
        <ul>
          <li>
            <span>卖5</span>
            <span :class="shareInfor.sellFivePrice<shareInfor.lastDayEndPrice?'green':'red'">{{shareInfor.sellFivePrice}}</span>
            <span>{{shareInfor.sellFiveNum}}</span>
          </li>
          <li>
            <span>卖4</span>
            <span :class="shareInfor.sellFourPrice<shareInfor.lastDayEndPrice?'green':'red'">{{shareInfor.sellFourPrice}}</span>
            <span>{{shareInfor.sellFourNum}}</span>
          </li>
          <li>
            <span>卖3</span>
            <span :class="shareInfor.sellThreePrice<shareInfor.lastDayEndPrice?'green':'red'">{{shareInfor.sellThreePrice}}</span>
            <span>{{shareInfor.sellThreeNum}}</span>
          </li>
          <li>
            <span>卖2</span>
            <span :class="shareInfor.sellTwoPrice<shareInfor.lastDayEndPrice?'green':'red'">{{shareInfor.sellTwoPrice}}</span>
            <span>{{shareInfor.sellTwoNum}}</span>
          </li>
          <li>
            <span>卖1</span>
            <span :class="shareInfor.sellOnePrice<shareInfor.lastDayEndPrice?'green':'red'">{{shareInfor.sellOnePrice}}</span>
            <span>{{shareInfor.sellOneNum}}</span>
          </li>
        </ul>
      </div>
      <div class="split-line">
        <span></span>
        <span></span>
      </div>
      <div class="buy-detail">
        <ul>
          <li>
            <span>买1</span>
            <span :class="shareInfor.buyOnePrice<shareInfor.lastDayEndPrice?'green':'red'">{{shareInfor.buyOnePrice}}</span>
            <span>{{shareInfor.buyOneNum}}</span>
          </li>
          <li>
            <span>买2</span>
            <span :class="shareInfor.buyTwoPrice<shareInfor.lastDayEndPrice?'green':'red'">{{shareInfor.buyTwoPrice}}</span>
            <span>{{shareInfor.buyTwoNum}}</span>
          </li>
          <li>
            <span>买3</span>
            <span :class="shareInfor.buyThreePrice<shareInfor.lastDayEndPrice?'green':'red'">{{shareInfor.buyThreePrice}}</span>
            <span>{{shareInfor.buyThreeNum}}</span>
          </li>
          <li>
            <span>买4</span>
            <span :class="shareInfor.buyFourPrice<shareInfor.lastDayEndPrice?'green':'red'">{{shareInfor.buyFourPrice}}</span>
            <span>{{shareInfor.buyFourNum}}</span>
          </li>
          <li>
            <span>买5</span>
            <span :class="shareInfor.buyFivePrice<shareInfor.lastDayEndPrice?'green':'red'">{{shareInfor.buyFivePrice}}</span>
            <span>{{shareInfor.buyFiveNum}}</span>
          </li>
        </ul>
      </div>
      <p>分时成交</p>
      <p>{{shareInfor.nowDate}}</p>
      <p>{{shareInfor.nowTime}}</p>
    </div>
    <!--广播-->
    <div class="radio">
      <span class="icon-radio"></span>
      <transition-group name="move">
        <span class="radio-text" v-show="i===index" v-for="(r,i) in radio" :key="r">{{r}}</span>
      </transition-group>
    </div>
    <!--底部区域-->
    <div class="footer">
      <div class="tab-titile" :class="{active:toggleActive2==0}" @click="toggleTab2(0)">评论</div>
      <div class="tab-titile" :class="{active:toggleActive2==1}" @click="toggleTab2(1)">资讯</div>
      <div class="share-comment" v-show="toggleActive2==0">评论详情</div>
      <div class="share-news" v-show="toggleActive2==1">资讯详情</div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { ADD_OPT,DEL_OPT } from '../store/mutation-types'
  export default {
    data() {
      return {
        share: {},
        toggleActive: 0,
        toggleActive2: 0,
        index: -1
      }
    },
    computed: {
      ...mapState({
        radio: state => state.radio,
        mineOpt:state => state.mineOpt
      }),
      shareInfor() {
        return this.share
      }
    },
    props: ['shareCode'],
    methods: {
      changeOpt(code){
        if(this.mineOpt.indexOf(code) > (-1)){ //已经自选则删除自选
          this.$store.commit(DEL_OPT,code)
        }else{
          this.$store.commit(ADD_OPT,code)
        }
      },
      toggleTab(i) {
        this.toggleActive = i
      },
      toggleTab2(i) {
        this.toggleActive2 = i
      },
      queryShare(code) {
        this.axios(`/sina/list=${code}`).then(res => {
          let str = res.data.split('"')[1]
          let arr = str.split(',')
          if(code.match('s_')){ //判断是指数还是个股
            this.share = {
              shareCode: code, //股票代码
              shareName: arr[0], //股票名
              nowPrice: Number(arr[1]).toFixed(2), //现价
              upAndDown:Number(arr[2]).toFixed(2), //涨跌额
              percent: Number(arr[3]), //涨跌幅
              //成交量
              volume: (Number(arr[4]) / 10000).toFixed(2),
              //成交额
              turnover: (Number(arr[5]) / 10000).toFixed(2),
            }
          }else{
            this.share = {
              shareCode: code, //股票代码
              shareName: arr[0], //股票名
              todayStartPrice: Number(arr[1]).toFixed(2), //今开
              lastDayEndPrice: Number(arr[2]).toFixed(2), //昨收
              nowPrice: Number(arr[3]).toFixed(2), //现价
              upAndDown:(Number(arr[3]).toFixed(2)-Number(arr[2]).toFixed(2)).toFixed(2), //涨跌额
              percent: ((Number(arr[3]) - Number(arr[2])) / Number(arr[2]) * 100).toFixed(2), //涨跌幅
              todayMaxPrice: arr[4], //今日最高价
              todayMinPrice: arr[5], //今日最低价
              //成交量
              volume: (Number(arr[8]) / 1000000).toFixed(2),
              //成交额
              turnover: (Number(arr[9]) / 100000000).toFixed(2),
              //买一到买五
              buyOneNum: parseInt(Number(arr[10]) / 100),
              buyOnePrice: Number(arr[11]),
              buyTwoNum: parseInt(Number(arr[12]) / 100),
              buyTwoPrice: Number(arr[13]),
              buyThreeNum: parseInt(Number(arr[14]) / 100),
              buyThreePrice: Number(arr[15]),
              buyFourNum: parseInt(Number(arr[16]) / 100),
              buyFourPrice: Number(arr[17]),
              buyFiveNum: parseInt(Number(arr[18]) / 100),
              buyFivePrice: Number(arr[19]),
              //卖一到卖五
              sellOneNum: parseInt(Number(arr[20]) / 100),
              sellOnePrice: Number(arr[21]),
              sellTwoNum: parseInt(Number(arr[22]) / 100),
              sellTwoPrice: Number(arr[23]),
              sellThreeNum: parseInt(Number(arr[24]) / 100),
              sellThreePrice: Number(arr[25]),
              sellFourNum: parseInt(Number(arr[26]) / 100),
              sellFourPrice: Number(arr[27]),
              sellFiveNum: parseInt(Number(arr[28]) / 100),
              sellFivePrice: Number(arr[29]),
              nowDate: arr[30],
              nowTime: arr[31],
            }
          }
        })
      }
    },
    mounted() {
      clearInterval(this.timer)
      clearInterval(this.timer2)
      this.timer = setInterval(this.queryShare(this.shareCode), 1000)
      this.timer2 = setInterval(() => {
        this.index++
          if(this.index > 2) {
            this.index = 0
          }
      }, 10000)
    },
    beforDestroy() {
      clearInterval(this.timer)
      clearInterval(this.timer2)
    }
  }
</script>

<style lang="scss">  
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .mine-opt{
    color: orange;
  }
  
  .active {
    color: blue;
    border-bottom: 3px solid blue;
  }
  
  .red {
    color: red;
  }
  
  .green {
    color: limegreen;
  }
  
  .share-details {
    background-color: #000;
    color: #eee;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 100px;
    font-size: 12px;
    .header {
      width: 100%;
      height: 50px;
      display: flex;
      span {
        display: inline-block;
        flex: 1;
      }
      .ret-btn {
        line-height: 60px;
        color: #C0C0C0;
        font-size: 20px;
        margin-left: 10px;
      }
      .details-name {
        text-align: center;
        h2 {
          margin-top: 10px;
          font-size: 14px;
          height: 20px;
        }
        p {
          font-size: 10px;
          color: #C0C0C0;
        }
      }
      .search-btn {
        text-align: right;
        margin-right: 10px;
        line-height: 60px;
        font-size: 20px;
        color: #C0C0C0;
      }
    }
    .share-infor {
      border-top: 1px solid #666;
      border-bottom: 1px solid #666;
      position: relative;
      tr {
        display: block;
        margin-left: 25%;
        td {
          box-sizing: border-box;
          display: inline-block;
          &:nth-of-type(2n-1) {
            color: #C0C0C0;
            width: 10%;
          }
          &:nth-of-type(2n) {
            width: 23.3%;
            text-align: center;
          }
        }
      }
      .share-price {
        position: absolute;
        width: 25%;
        text-align: center;
        h1 {
          font-size: 18px;
        }
        p {
          display: flex;
          span {
            flex: 1;
          }
        }
      }
    }
    .five-detail {
      float: right;
      width: 30%;
      background-color: #000;
      margin-top: -320px;
      .sell-detail,
      .buy-detail {
        width: 100%;
        ul {
          li {
            display: flex;
            padding: 0 3px;
            span {
              flex: 1;
              &:first-of-type {
                color: #C0C0C0;
                font-size: 10px;
              }
              &:last-of-type {
                color: #fff;
                text-align: right;
              }
            }
          }
        }
      }
      .buy-detail {
        margin-top: 10px;
      }
      p {
        color: #C0C0C0;
        text-align: center;
      }
    }
    .k-line {
      width: 100%;
      .k-ul {
        list-style: none;
        padding: 0;
        width: 100%;
        display: flex;
        margin-top: 10px;
        li {
          display: inline-block;
          font-size: 14px;
          height: 25px;
          text-align: center;
          margin: 0 10px;
          line-height: 30px;
          color: #C0C0C0;
          margin-top: -10px;
          flex: 1;
          &:last-of-type {
            font-size: 20px;
          }
        }
      }
      .k-line-chat {
        padding: 0;
        border: 1px solid #666;
        width: 70%;
        margin-top: 5px;
        list-style: none;
        li {
          width: 100%;
          font-size: 14px;
          color: #C0C0C0;
          line-height: 200px;
          height: 320px;
          text-align: center;
        }
      }
    }
    .split-line {
      margin-top: -6px;
      width: 100%;
      height: 5px;
      span {
        display: inline-block;
        width: 50%;
        height: 100%;
        background-color: red;
        &:last-of-type {
          background-color: green;
        }
      }
    }
    .radio {
      color: deepskyblue;
      width: 320px;
      position: relative;
      .radio-text {
        position: absolute;
        width: 600px;
        left: 600px;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .footer{
      width: 100%;
      margin-top: 5px;
      display: flex;
      position: relative;
      text-align: center;
      .tab-titile{
        flex: 1;
        margin: 0 20%;
        font-size: 14px;
      }
      .share-comment{
        position: absolute;
        top: 20px;
      }
      .share-news{
        position: absolute;
        top: 20px;
      }
    }
  }
  
  .move-enter {
    transform: translateX(0);
  }
  
  .move-enter-active,
  .move-leave-active {
    transition: all 10s linear;
  }
  
  .move-enter-to,
  .move-leave {
    transform: translateX(-600px);
  }
  
  .move-leave-to {
    transform: translateX(-1200px);
  }
</style>