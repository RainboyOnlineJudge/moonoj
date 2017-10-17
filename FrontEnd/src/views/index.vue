<template>
  <div class="layout-container">
    <!--<Carousel v-model="value1">-->
        <!--<Carousel-item>-->
          <!--<div class="carousel-img-container">-->
              <!--<img class="carousel-img" src="static/bg1.jpg"/>-->
          <!--</div>-->
        <!--</Carousel-item>-->
        <!--<Carousel-item>-->
          <!--<div class="carousel-img-container">-->
              <!--<img class="carousel-img" src="static/bg2.jpg"/>-->
          <!--</div>-->
        <!--</Carousel-item>-->
        <!--<Carousel-item>-->
          <!--<div class="carousel-img-container">-->
              <!--<img class="carousel-img" src="static/bg3.jpg"/>-->
          <!--</div>-->
        <!--</Carousel-item>-->
    <!--</Carousel>-->

    <Row>
      <div class="carousel-img-container">
        <img :src="imgDate" style="border-radius:100%"/>
      </div>
    </Row>
  </div>
</template>

<script>
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
    imgDate:function(){
      return process.env.api+'avatar/'+this.$store.state.user.uinfo.avatar;
    },
  }
}
</script>
<style>
.carousel-img-container{
  text-align:center;
}

.carousel-img {
  height:300px;
}
</style>
