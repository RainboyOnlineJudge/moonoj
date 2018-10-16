<template>
  <div>
    <div>
      <problem :id="id" :force="false"> </problem>
    </div>
  </div>
</template>

<script>
import problem from '../../components/problem.vue'
import loading from '../../components/loading.vue'
export default {
  data(){
    return {
    }
  },
  computed:{
    id(){
      let id = this.$route.params.id
      return parseInt(id)
    }
  },
  methods:{
  },
  components:{
    problem,
    loading
  }
}
</script>
