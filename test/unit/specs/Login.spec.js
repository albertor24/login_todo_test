import Vue from 'vue'
import Login from '@/components/Login'

describe('Login.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#login-header').textContent)
      .to.equal('LOGIN TO VIEW OR ADD TO-DOS')
  })
  it('should show an error on an empty submit', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    vm.$el.querySelector('.login-btn').click()
    expect(vm.$el.querySelector('.error-msg').textContent)
      .to.equal('Wrong username. Please try again.')
  })
})
