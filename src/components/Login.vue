<template>
  <div class="container-fluid">
    <h1>LOGIN TO VIEW OR ADD TO-DOS</h1>
    <div>
      <label for="login-input">Username</label>
      <input id="login-input" v-model="username" :placeholder="placeholder"/>
      <button type="button" class="btn btn-secondary" v-on:click="login(username)">Submit</button>
      <p v-if="tried">Wrong username. Please try again.</p>
    </div>
  </div>
</template>

<!-- text/babel is needed for linter to accept es6 syntax inside .vue files -->
<script type="text/babel">
  import {login as authLogin} from '../services/auth'

  let component = {
    name: 'login',
    data () {
      return {
        tried: false,
        username: '',
        placeholder: 'Enter your username'
      }
    },
    methods: {
      login (username) {
        authLogin(username).then(result => {
          this.tried = !result
        }).catch(error => {
          console.log('Error', error)
        })
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

  label {
    display: block;
  }
</style>
