<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>home</h2>
  </div>
</template>

<script>
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
    initData () {
      console.log('detail')
      // detail()
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
