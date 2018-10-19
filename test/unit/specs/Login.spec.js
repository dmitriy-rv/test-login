import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Login from '@/components/Login'

import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)



describe('Login.vue', () => {
	const wrapper = shallowMount(Login, {
  	localVue
	})

  it('Get wrong password', () => {
		wrapper.setData({  
			email: 'test@test.test', 
			password: '1234567',
			validEmail: true,
      validPassword: true
    })
		
		const button = wrapper.find('button')
  	button.trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.errorText).toBe('Введен неверный пароль')
      expect(wrapper.vm.validation).toBe(false)
      done()
    })
  })
  it('Get wrong email', () => {
		wrapper.setData({  
			email: 'te@te.te', 
			password: '1234567',
			validEmail: true,
      validPassword: true
    })
		
		const button = wrapper.find('button')
  	button.trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.errorText).toBe('Почта не найдена. Попробуйте зарегистрироваться')
      expect(wrapper.vm.validation).toBe(false)
      done()
    })
  })
    it('validation test', () => {
		wrapper.setData({ validEmail: false, validPassword: true })
    expect(wrapper.vm.validation).toBe(false)

		wrapper.setData({ validEmail: true, validPassword: false })
    expect(wrapper.vm.validation).toBe(false)

    wrapper.setData({ validEmail: true, validPassword: true })
    expect(wrapper.vm.validation).toBe(true)
  })
   it('success login', () => {
		wrapper.setData({  
			email: 'test@test.test', 
			password: 'qweQWE123',
			validEmail: true,
      validPassword: true
    })
		
		const button = wrapper.find('button')
  	button.trigger('click')
    wrapper.vm.$nextTick(() => {
    	console.log(wrapper.vm.$route.path)
      expect(wrapper.vm.$route.path).toBe('/home')
      done()
    })
  })
})