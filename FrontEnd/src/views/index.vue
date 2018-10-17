<template>
  <div class="index">
    <Row>
      <div class="info-header">
        <div class="info-header-child">
          <h3>Well Come</h3>
          <h1> Moon Online Judge </h1>
        </div>
      </div>
    </Row>
    <br><br>
    <Row>
      <div style="display:flex">
        <div class="user-info">
          <div class="carousel-img-container">
            <img :src="avatar"/>
          </div>
          <div class="user-name">
            <h2>{{uinfo.username}}</h2>
          </div>
        </div>
        <div class="sub-calendar">
            <h2>提交频率</h2>
        </div>
      </div>
    </Row>
    <br>
    <Row>
      <div style="display:flex">
        <div class="announcement">
          <h2> 公告 </h2>
        </div>
        <div class="contest-list-panel">
          <h2> 最新比赛 </h2>
        </div>
      </div>
    </Row>
      <br>
    <Row>
      <div class="rank">
        <h2> 排行榜 </h2>
      </div>
      <br>
    </Row>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      value1: 0
    }
  },
  methods:{
  },
  computed:{
    ...mapGetters([
      'uinfo',
      'avatar'
    ])
  }
}
</script>
<style>

.index  {
  margin-bottom:30px;
}

.info-header, .user-info , .sub-calendar,.rank,.announcement,.contest-list-panel{
  background:#eee;
}

.info-header{
  height:200px;
  width:100%;
  display:flex;
}
.info-header .info-header-child {
  margin:auto;
  text-align:center;
}
.info-header .info-header-child  h1{
  font-size:4em;
}

.info-header .info-header-child  h3{
  font-size:2.5em;
}

.user-info {
  height:200px;
  width:200px;
  padding:5px;
  text-align:center;
  border-radius:5px;
}

.user-info .carousel-img-container >img{
  width:150px;
  height:150px;
  border-radius:15px;
  border:1px solid #eee;
}

.user-info .user-name {
  text-align:center;
}

.sub-calendar,.contest-list-panel{
  height:200px;
  border-radius:5px;
  margin-left:20px;
  width:100%;
}
.announcement ,.contest-list-panel{
  width:400px;
}

</style>
