<template>
  <div class="container-fluid">
    <!-- v-if="showModal" @close="showModal = false" -->
    <new-todo v-if="showModal" @close="saveTodo"></new-todo>
    <div class="row">
      <div class="user-profile col-xs-12">
        <div class="pull-right">
          <h3>Welcome, {{user.name}}</h3>
          <button v-on:click="newTodoModal()">Add To-Do</button>
          <button v-on:click="logout()">Logout</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <ul id="example-1">
              <h3>To-Dos</h3>
              <li v-for="todo in todo">
                <input type="checkbox" v-bind:id="todo.id" v-model="todo.completed">
                <label v-bind:for="todo.id">{{ todo.title }}</label>
              </li>
            </ul>
          </div>
          <div class="col-md-6">
            <ul id="example-2">
              <h3>Completed</h3>
              <li v-for="todo in completed">
                <input type="checkbox" v-bind:id="todo.id" v-model="todo.completed">
                <label v-bind:for="todo.id">{{ todo.title }}</label>
              </li>
            </ul>
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
        this.todos.unshift({
          userId: this.user.id,
          id: this.lastID + 1,
          title: todo,
          completed: false
        })
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
</style>
