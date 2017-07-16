<template>
  <div id="app">
    <img src="./assets/logo.png">
    <todo v-if="$store.state.auth"></todo>
    <login v-else></login>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Login from './components/Login'
import Todo from './components/Todo'

export default {
  name: 'app',
  components: {
    Hello,
    Login,
    Todo
  },
  data () {
    return {}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
