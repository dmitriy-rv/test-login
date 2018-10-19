import Vue from 'vue'
import { mount } from '@vue/test-utils'
import password from '@/components/input/password'

describe('password.vue', () => {
	const wrapper = mount(password)
  const badValue = '123456'
  const goodValue = 'qweQWE123'

  it('validation password text fail', () => {
		wrapper.setProps({ value: badValue })

    expect(wrapper.vm.textError).toBe(true)
  })
  it('validation password text success', () => {
		wrapper.setProps({ value: goodValue })

    expect(wrapper.vm.textError).toBe(false)
  })
  it('validation password empty', () => {
		wrapper.setProps({ value: '' })
		wrapper.setData({ firstFocus: false })

    expect(wrapper.vm.emptyError).toBe(true)

    wrapper.setProps({ value: badValue })
    expect(wrapper.vm.emptyError).toBe(false)
  })
  it('show validation text', () => {
		wrapper.setProps({ value: badValue })
		wrapper.setData({ firstFocus: false })
    expect(wrapper.html()).toContain('Пароль должен содержать заглавные и строчные латинские буквы и хотя бы 1 цифру. Не менее 8 символов')

    wrapper.setProps({ value: goodValue })
    expect(wrapper.html()).not.toContain('Пароль должен содержать заглавные и строчные латинские буквы и хотя бы 1 цифру. Не менее 8 символов')
  })
  it('show empty text', () => {
		wrapper.setProps({ value: '' })
		wrapper.setData({ firstFocus: false })
    expect(wrapper.html()).toContain('Поле не должно быть пустым')

    wrapper.setProps({ value: goodValue })
    expect(wrapper.html()).not.toContain('Поле не должно быть пустым')
  })
})
