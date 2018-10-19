<template>
  <div  class="input-wrap">
    <span>{{ link }}</span><br>
    <input
        type="password"
        :value="value"
        @input="$emit('input', $event.target.value)"
        placeholder="Пароль"
        @blur="blur"
        :class="{error: errorText !=''}">
    <div class="error-text">
      {{ errorText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputPassword',
  props: ['value', 'link'],
  data () {
    return {
      emptyError: false,
      textError: false,
      firstFocus: true,
      errorText: ''
    }
  },
  watch: {
    value: function (val) {
      this.validate(val)
    }
  },
  methods: {
    blur () {
      this.firstFocus = false
      this.validate(this.value)
    },
    validate (password) {
      var passwordRE = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g
      if (passwordRE.test(password)) {
        this.textError = false
      } else {
        this.textError = true
        if (!this.firstFocus) {
          this.errorText = 'Пароль должен содержать заглавные и строчные латинские буквы и хотя бы 1 цифру. Не менее 8 символов'
        }
      }
      if (password === '') {
        this.emptyError = true
        if (!this.firstFocus) {
          this.errorText = 'Поле не должно быть пустым'
        }
      } else {
        this.emptyError = false
      }

      if (this.emptyError || this.textError) {
        this.$emit('password-invalid')
      } else {
        this.errorText = ''
        this.$emit('password-valid')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  box-sizing: border-box;
}
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.error{
  border: 1px solid red;
}
.error-text{
  color:red;
  width: 300px;
  margin: auto;
}
input{
  width: 200px;
  height: 40px;
  padding-left: 10px;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  outline:none;
}
.input-wrap{
  margin-bottom: 20px;
}
</style>
