<template>
  <div>
    <h1>Регистрация</h1>
    <form @submit="send(password, email)">
      <inputEmail  link="Введите e-mail"
        v-model="email"
        @email-invalid="validEmail = false"
        @email-valid="validEmail = true"></inputEmail>
      <inputPassword  link="Введите пароль"
        v-model="password"
        @password-invalid="validPassword = false"
        @password-valid="validPassword = true"></inputPassword>
      <inputPassword  link="Повторите пароль"
        v-model="password2"
        @password-invalid="validPassword2 = false"
        @password-valid="validPassword2 = true"></inputPassword>
      <div class="errorText">
        {{ errorText }}
      </div>
      <button type="submit" :disabled="!validation">Зарегестрироваться</button>
    </form>
    <router-link to="/">Авторизоваться</router-link>
  </div>
</template>

<script>
import { auth } from '../main'
import inputEmail from '@/components/input/email'
import inputPassword from '@/components/input/password'
export default {
  name: 'SignUp',
  components: {
    inputEmail,
    inputPassword
  },
  data () {
    return {
      password: '',
      password2: '',
      email: '',
      validEmail: false,
      validPassword: false,
      validPassword2: false,
      errorText: ''
    }
  },
  watch: {
    equelPasswordError: function (val) {
      if (val) {
        this.errorText = 'Пароли не совпадают'
      } else {
        this.errorText = ''
      }
    }
  },
  computed: {
    equelPasswordError: function () {
      if (!this.equelPassword && this.validPassword && this.validPassword2) {
        return true
      } else {
        return false
      }
    },
    equelPassword: function () {
      if (this.password === this.password2) {
        return true
      } else {
        return false
      }
    },
    validation: function () {
      if (this.validEmail && this.validPassword && this.equelPassword) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    send (password, email) {
      var self = this
      auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode === 'auth/email-already-in-use') {
          self.validEmail = false
          self.errorText = 'Эта почта уже зарегистрированна. Попробуйте авторизоваться'
        }
        console.log('#' + errorCode + ' message:' + errorMessage)
        // ...
      })
      auth.onAuthStateChanged(function (user) {
        if (user) {
          self.$router.push('/home')
        } else {
          // No user is signed in.
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.errorText{
  color:red;
}
button{
  width: 200px;
  height: 40px;
  margin-bottom: 30px;
  margin-top: 10px;
}
</style>
