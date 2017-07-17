<template>
    <div id="app">
      <transition name="fade">
        <todo v-if="$store.state.auth" key="todo"></todo>
        <login v-else key="login"></login>
      </transition>
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

.fade-enter-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
