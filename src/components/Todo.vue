<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ user.name }}</h2>
    <button v-on:click="logout()">Logout</button>
  </div>
</template>

<!-- text/babel is needed for linter to accept es6 syntax inside .vue files -->
<script type="text/babel">
  import {getCurrentUser, logout as authLogout} from '../services/auth'

  let component = {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to the Todo App',
        user: JSON.parse(getCurrentUser())
      }
    },
    methods: {
      logout () {
        authLogout()
      }
    }
  }

  export default component
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
