<template>
  <div class="container-fluid">
    <div class="login-logo">
      <svg height="150" width="150">
        <polygon class="orange" points="0,50 25,0 50,50"></polygon>
        <polygon class="orange" points="75,50 100,0 125,50"></polygon>
        <polygon class="black" points="0,50 125,50 125,100 0,100"></polygon>
        <polygon class="black" points="0,100 62.5,150 125,100"></polygon>
      </svg>
    </div>
    <div class="row">
      <div class="col-md-offset-2 col-md-8">
        <h1 id="login-header">LOGIN TO VIEW OR ADD TO-DOS</h1>
        <label for="login-input">Username</label>
        <div class="input-group full-width" v-bind:class="{ 'has-error': tried }">
          <input v-model="username" type="text" class="form-control"
                 v-on:focus="tried = false" id="login-input" :placeholder="placeholder" />
          <div v-bind:class="{ 'invisible': !tried }">
            <span class="glyphicon glyphicon-remove form-control-feedback"></span>
            <p class="error-msg">Wrong username. Please try again.</p>
          </div>
          <button type="button" class="btn btn-secondary login-btn" v-on:click="login(username)">Login</button>
        </div>
      </div>
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
  .login-logo {
    margin-top: 1em;
  }

  h1, h2 {
    font-weight: normal;
  }

  label {
    text-align: left;
    display: block;
  }

  p {
    display: inline-block;
  }

  p.error-msg {
    margin: 0.5em 0;
    color: red;
  }

  .full-width {
    width: 100%;
  }
</style>
