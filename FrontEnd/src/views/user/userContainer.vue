<template>
  <div class="layout-container">
    <Row>
      <Col span="5">
        <hmenu :data="menuData" theme="light" title="用户管理"></hmenu>
      </Col>
      <Col span="19">
        <router-view></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
import hmenu from '../../components/HMenu.vue'
export default {
  name: 'userContainer',
  data () {
    return {
      menuData:[
        {
          icon:"ios-home-outline",
          str:"用户信息",
          pathname:"userDetailInfo"
        },
        {
          icon:"ios-cloud-upload-outline",
          str:"用户提交",
          pathname:'userSubmition'
        }
      ]
    }
  },
  components:{
    hmenu
  }
}
</script>
