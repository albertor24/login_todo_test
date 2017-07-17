<template>
  <transition name="todo-modal">
    <div class="todo-modal-mask">
      <div class="todo-modal-wrapper">
        <div class="todo-modal-container">
          <div class="todo-modal-header">
            <h3>
              Add To-Do
            </h3>
          </div>
          <div class="todo-modal-body">
            <div class="input-group full-width" v-bind:class="{ 'has-error': showWarn }">
              <input v-on:focus="showWarn = false" v-model="todo" type="text" class="form-control"
                      :placeholder="placeholder" />
              <div v-bind:class="{ 'invisible': !showWarn }">
                <span class="glyphicon glyphicon-remove form-control-feedback"></span>
                <p class="error-msg">Cannot submit empty "ToDo".</p>
              </div>
              <button class="modal-default-button btn btn-secondary" @click="$emit('close', '')">
                Cancel
              </button>
              <button class="modal-default-button btn btn-primary" @click="savePost(todo)">
                OK
              </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  let component = {
    name: 'newtodo',
    data () {
      return {
        todo: '',
        placeholder: 'Enter a todo',
        showWarn: false
      }
    },
    props: ['show'],
    methods: {
      savePost (todo) {
        if (!todo) {
          this.showWarn = true
          return
        }
        this.$emit('close', todo)
      }
    }
  }
  export default component
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .todo-modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .todo-modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .todo-modal-container {
    width: 30em;
    margin: 0 auto;
    padding: 2em 3em ;
    background-color: #fff;
    border-radius: 0.2em;
    box-shadow: 0 0.3em 0.8em rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .todo-modal-header h3 {
    margin-top: 0;
    color: #337ab7;
  }

  .todo-modal-body {
    margin: 2em 0;
  }

  .todo-modal-default-button {
    float: right;
  }

  .todo-modal-enter {
    opacity: 0;
  }

  .todo-modal-leave-active {
    opacity: 0;
  }

  .todo-modal-enter .todo-modal-container,
  .todo-modal-leave-active .todo-modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .full-width {
    width: 100%;
  }

  .error-msg {
    color: red;
  }

  button {
    margin-left: 1em;
  }
</style>
