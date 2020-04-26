module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.jisuapi.com",
        changeOrigin: true,
        pathRewrite:{
          "^/api":"",
        }
      },
      "/sina":{
        target:"http://hq.sinajs.cn",
        changeOrigin:true,
        pathRewrite:{
          "/sina":"",
        }
      },
      "/kchat":{
        target:"http://image.sinajs.cn/newchart",
        changeOrigin:true,
        pathRewrite:{
          "/kchat":""
        }
      },
      "/news":{
        target:"http://api.tianapi.com/caijing/index",
        changeOrigin:true,
        pathRewrite:{
          "/news":""
        }
      }
    }
  }
}