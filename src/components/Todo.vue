<template>
  <div class="container-fluid">
    <new-todo v-if="showModal" @close="saveTodo"></new-todo>
    <div class="row user-profile">
        <div class="col-xs-offset-4 col-xs-4 custom-logo">
          <svg height="75" width="75">
            <polygon class="orange" points="0,25 12.5,0 25,25"></polygon>
            <polygon class="orange" points="37.5,25 50,0 62.5,25"></polygon>
            <polygon class="black" points="0,25 62.5,25 62.5,50 0,50"></polygon>
            <polygon class="black" points="0,50 31.25,75 62.5,50"></polygon>
          </svg>
        </div>
        <div class="col-xs-4 pull-right">
          <h3>Welcome, {{user.name}}</h3>
          <button type="button" class="btn btn-primary" v-on:click="newTodoModal()">Add To-Do</button>
          <button type="button" class="btn btn-danger" v-on:click="logout()">Logout</button>
        </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <h3>To-Dos</h3>
            <transition-group name="list" tag="ul">
              <li v-bind:key="todo.id" v-for="todo in todo">
                <input type="checkbox" v-bind:id="todo.id" v-model="todo.completed">
                <label v-bind:for="todo.id">{{ todo.title }}</label>
              </li>
              </transition-group>
          </div>
          <div class="col-md-6">
            <h3>Completed</h3>
            <transition-group name="list" tag="ul">
              <li v-bind:key="todo.id" v-for="todo in completed">
                <input type="checkbox" v-bind:id="todo.id" v-model="todo.completed">
                <label v-bind:for="todo.id">{{ todo.title }}</label>
              </li>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- text/babel is needed for linter to accept es6 syntax inside .vue files -->
<script type="text/babel">
  import NewTodo from '@/components/NewTodo'
  import {getCurrentUser, logout as authLogout} from '../services/auth'
  import {getTodos} from '../services/todo'

  let component = {
    name: 'todo',
    components: {
      NewTodo
    },
    data () {
      return {
        showModal: false,
        user: getCurrentUser(),
        todos: []
      }
    },
    methods: {
      logout () {
        authLogout()
      },
      newTodoModal () {
        this.showModal = true
      },
      saveTodo (todo) {
        this.showModal = false
        if (!todo) {
          return
        }
        let newTodo = {
          userId: this.user.id,
          id: this.lastID + 1,
          title: todo,
          completed: false
        }
        this.todos.unshift(newTodo)
      }
    },
    computed: {
      completed () {
        return this.todos.filter(t => t.completed)
      },
      todo () {
        return this.todos.filter(t => !t.completed)
      },
      lastID () {
        return this.todos.reduce((t, c) => c.id > t ? c.id : t, 0)
      }
    },
    mounted () {
      getTodos().then(t => {
        this.todos = t
      })
    }
  }

  export default component
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .custom-logo {
    margin-top: 0.25em;
  }
  .user-profile {
    padding-bottom: 1.25em;
    border-bottom: 0.15em solid grey;
  }
  li {
    list-style: none;
  }

  input:checked+label {
    color: #999;
    text-decoration: line-through;
  }

  .list-enter-active, .list-leave-active {
    transition: all 0.5s;
  }
  .list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
