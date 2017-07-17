<template>
  <div id="app">
    <todo v-if="$store.state.auth"></todo>
    <login v-else></login>
  </div>
</template>

<script>
import Login from './components/Login'
import Todo from './components/Todo'
import {isUserAuth} from './services/auth'

isUserAuth()

export default {
  name: 'app',
  components: {
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
}
</style>
