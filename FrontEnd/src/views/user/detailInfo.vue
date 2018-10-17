<template>
    <div>
  <h1>头像:</h1>
      <div class="avatar_preview_item">
          <img :src="avatar" />
      </div>
  <h1>建设中...</h1>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
    }
  },

  computed:{
    ...mapGetters([
      'avatar'
    ])
  }

}
</script>
<style>

.avatar_upload {
  margin-left:20px;
}

.avatar_preview_item{
  margin-left:20px;
  position:relative;
  height:200px;
  width:200px;
  margin-right:20px;
  float:left;
}

.avatar_preview_item img {
  border-radius:15px;
  padding:3px;
  height:200px;
  width:200px;
  border:1px solid rgba(0, 0, 0, 0.15);
}
</style>
