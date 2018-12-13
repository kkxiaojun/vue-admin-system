<template>
  <div>
    <router-view></router-view>
    <el-row>
      <el-button type="primary" @click="logOut">注销</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { detail } from '@/service/getData'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to my home'
    }
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapActions(['userLoginOut']),
    initData () {
      console.log('detail')
      // detail()
    },
    logOut () {
      this.userLoginOut();
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
