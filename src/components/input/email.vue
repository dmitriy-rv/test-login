<template>
  <div class="input-wrap">
    <span>{{ link }}</span><br>
    <input :value="value"
        @input="$emit('input', $event.target.value)"
        placeholder="Email"
        @blur="blur"
        :class="{error: errorText !=''}">
    <div class="error-text">
      {{ errorText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputEmail',
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
    validate (email) {
      var emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (emailRE.test(email)) {
        this.textError = false
      } else {
        this.textError = true
        if (!this.firstFocus) {
          this.errorText = 'Значение должно соответсвтовать формату example@mail.com'
        }
      }
      if (email === '') {
        this.emptyError = true
        if (!this.firstFocus) {
          this.errorText = 'Поле не должно быть пустым'
        }
      } else {
        this.emptyError = false
      }

      if (this.emptyError || this.textError) {
        this.$emit('email-invalid')
      } else {
        this.errorText = ''
        this.$emit('email-valid')
      }
    },
    sendToParent () {

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
