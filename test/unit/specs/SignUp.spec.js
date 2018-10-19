import Vue from 'vue'
import { mount } from '@vue/test-utils'
import SignUp from '@/components/SignUp'

import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)



describe('SignUp.vue', () => {
	const wrapper = shallowMount(SignUp, {
  	localVue
	})

  it('Get equal password', () => {
    wrapper.setData({  
      password: '1234567',
      password2: '123456',
      validPassword: false,
      validPassword2: true
    })

    expect(wrapper.vm.errorText).toBe('')

    wrapper.setData({  
      password: '12345678',
      password2: '123ds67s',
      validPassword: true,
      validPassword2: true
    })
    
    expect(wrapper.vm.errorText).toBe('Пароли не совпадают')

    wrapper.setData({  
      password: '12345678',
      password2: '12345678',
      validPassword: true,
      validPassword2: true
    })

    expect(wrapper.vm.errorText).toBe('')
  })
  it('Get exist email', () => {
		wrapper.setData({  
			email: 'test@test.test', 
			password: '1234567',
			validEmail: true,
      validPassword: true
    })
		
		const button = wrapper.find('button')
  	button.trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.errorText).toBe('Эта почта уже зарегистрированна. Попробуйте авторизоваться')
      expect(wrapper.vm.validation).toBe(false)
      done()
    })
  })
  it('validation test', () => {
    wrapper.setData({ 
      validEmail: false, 
      validPassword: true,
      password: '12345678',
      password2: '12345678',
    })
    expect(wrapper.vm.validation).toBe(false)

    wrapper.setData({ 
      validEmail: true, 
      validPassword: false,
      password: '12345678',
      password2: '12345678',
    })
    expect(wrapper.vm.validation).toBe(false)
    
    wrapper.setData({ 
      validEmail: true, 
      validPassword: true,
      password: '123456',
      password2: '12345678',
    })
    expect(wrapper.vm.validation).toBe(false)

    wrapper.setData({ 
      validEmail: true, 
      validPassword: true,
      password: '12345678',
      password2: '12345678',
    })
    expect(wrapper.vm.validation).toBe(true)
  })
  it('success login', () => {
    var userName = Math.floor(Math.random()*1000)
		wrapper.setData({  
			email: userName +'@test.test', 
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