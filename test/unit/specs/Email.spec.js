import Vue from 'vue'
import { mount } from '@vue/test-utils'
import email from '@/components/input/email'

describe('email.vue', () => {
	const wrapper = mount(email)

  it('validation email text fail', () => {
		wrapper.setProps({ value: 'test' })

    expect(wrapper.vm.textError).toBe(true)
  })
  it('validation email text success', () => {
		wrapper.setProps({ value: 'test@test.test' })

    expect(wrapper.vm.textError).toBe(false)
  })
  it('validation email empty', () => {
		wrapper.setProps({ value: '' })
		wrapper.setData({ firstFocus: false })

    expect(wrapper.vm.emptyError).toBe(true)

    wrapper.setProps({ value: 'test' })
    expect(wrapper.vm.emptyError).toBe(false)
  })
  it('show validation text', () => {
		wrapper.setProps({ value: 'test' })
		wrapper.setData({ firstFocus: false })
    expect(wrapper.html()).toContain('Значение должно соответсвтовать формату example@mail.com')

    wrapper.setProps({ value: 'test@test.test' })
    expect(wrapper.html()).not.toContain('Значение должно соответсвтовать формату example@mail.com')
  })
    it('show empty text', () => {
		wrapper.setProps({ value: '' })
		wrapper.setData({ firstFocus: false })
    expect(wrapper.html()).toContain('Поле не должно быть пустым')

    wrapper.setProps({ value: 'test@test.test' })
    expect(wrapper.html()).not.toContain('Поле не должно быть пустым')
  })
})
