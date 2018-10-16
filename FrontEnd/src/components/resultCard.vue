<template>
  <div class="home-card">
    <div :class="getClass">
      <span>{{map[resultCode]}}</span>
      <p> Time: <span class="time">{{timeTrans}}</span> s </p>
      <p> Memory: <span class="memory">{{memTrans}}</span> mb </p>
    </div>
    <div class="card-mark">
      <span class="download">下载数据<Icon type="android-download"></Icon></span>
      <p class="title">{{detail}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data:function(){
    return {
      map:{
        "-1":'WA',
        "0":'AC',
        "1":'TLE',
        "2":'TLE',
        "3":'MLE',
        "4":'RE',
        "5":'SE',
      }
    }
  },
  props:{
    resultCode:Number,
    detail:String,
    memory:Number,
    time:Number,
  },
  computed:{
    'getClass':function(){
      return {
        'judge-result':true,
        'loader':this.resultCode==-2,
        'wa':this.resultCode==-1,
        'accept':this.resultCode==0,
        'tle':this.resultCode==1 || this.resultCode ==2 ,
        'mle':this.resultCode==3,
        're':this.resultCode==4,
        'se':this.resultCode==5,
        'ce':this.resultCode==6,
      }
    },
    'timeTrans':function(){
      return (this.time /1000).toFixed(3)
    },
    'memTrans':function(){
      return (this.memory/1024).toFixed(3)
    }
  }
}
</script>

<style>
.home-card {
  color:#fff;
  width: 160px;
  height: 100px;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  background: #fff;
  float: left;
  margin: 0 0 20px 20px;
  cursor:pointer;
  border:1px solid rgba(0,0,0,0.5);
}


.judge-result {
  text-align:center;
  width:160px;
  height:100px;
}

.judge-result>span:first-child {
  font-size:33px;
  display:block;
  /*position:relative;*/
  /*top:50%;*/
  /*transform: translateY(-50%);*/
}
.judge-result span.time, .judge-result span.memory {
    font-size:15px;
    font-weight:bold;
}
.judge-result>p {
    margin:2px 2px;
    font-size:15px;
}

.accept {
  background:green;
}

.wa {
  background:IndianRed;
}

.tle {
  background:RoyalBlue;
}

.mle {
  background:DarkMagenta;
}

.re {
  background:Orange;
}

.se {
  background:LightSlateGray;
}



.card-mark span.download {
    font-size:13px;
}

.card-mark span.download:hover {
    color:#f00;
}

.card-mark {
    text-align:center;
    display:none;
    position: absolute;
    left: 0;
    width: 160px;
    height: 100px;
    font-size: 12px;
    line-height: 20px;
    padding: 10px 5px;
}

.card-mark>p{
    margin:0;
}

.home-card:hover .card-mark {
    display:block;
    top:0;
    height: 100%;
    background: rgba(0,0,0,.7);
}

.home-card:hover .accept+div.card-mark {
    display:none !important;
}
.home-card:hover .loader+div.card-mark {
    display:none !important;
}


// loader
.loader {
  position: relative;
  width: 2.5em;
  height: 2.5em;
  transform: rotate(165deg);
}
.loader:before, .loader:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0.5em;
  height: 0.5em;
  border-radius: 0.25em;
  transform: translate(-50%, -50%);
}
.loader:before {
  animation: before 2s infinite;
}
.loader:after {
  animation: after 2s infinite;
}

@keyframes before {
  0% {
    width: 0.5em;
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
  }
  35% {
    width: 2.5em;
    box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
  }
  70% {
    width: 0.5em;
    box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
  }
  100% {
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
  }
}
@keyframes after {
  0% {
    height: 0.5em;
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
  }
  35% {
    height: 2.5em;
    box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
  }
  70% {
    height: 0.5em;
    box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
  }
  100% {
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
  }
}
</style>

