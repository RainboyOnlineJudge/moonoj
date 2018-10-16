<template>
    <Menu :theme="theme" active-name="1" width="auto" @on-select="menuItemClick">
        <Menu-group :title="title">
          <template v-for="d in data">
            <Menu-item :name="d.pathname" @click="menuItemClick(d)">
                <Icon :type="d.icon"></Icon>
                {{d.str}}
            </Menu-item>
          </template>
        </Menu-group>
    </Menu>
</template>
<script>
    export default {
        data () {
          return {
          }
        },
      props:{
        theme:{
          type:String,
          default(){
            return 'dark'
          }
        },
        data:{
          type:Array
        },
        title:{
          type:String
        }
      },
      methods:{
        menuItemClick(val){
          this.$router.replace({name:val})
        }
      }
    }
</script>
