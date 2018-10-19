<template>
  <div>
    <h1>Авторизация</h1>
    <form @submit="send(email, password)">
      <inputEmail link="Введите e-mail"
        v-model="email"
        @email-invalid="validEmail = false"
        @email-valid="validEmail = true"></inputEmail>
      <inputPassword link="Введите пароль"
        v-model="password"
        @password-invalid="validPassword = false"
        @password-valid="validPassword = true"></inputPassword>
      <div class="errorText">
        {{ errorText }}
      </div>
      <button type="submit" v-bind:disabled="!validation">Войти</button>
    </form>
    <router-link to="/signup">Зарегистрироваться</router-link>
  </div>
</template>

<script>
import { auth } from '../main'
import inputEmail from '@/components/input/email'
import inputPassword from '@/components/input/password'
export default {
  name: 'Login',
  components: {
    inputEmail,
    inputPassword
  },
  data () {
    return {
      password: '',
      email: '',
      validEmail: false,
      validPassword: false,
      errorText: ''
    }
  },
  computed: {
    validation: function () {
      if (this.validEmail && this.validPassword) {
        return true
      } else {
        return false
      }
    }
  },
  mounted: function () {
    var self = this
    auth.onAuthStateChanged(function (user) {
      if (user) {
        self.$router.push('/home')
      }
    })
  },
  methods: {
    send (email, password) {
      var self = this
      auth.signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message

        if (errorCode === 'auth/user-not-found') {
          self.validEmail = false
          self.errorText = 'Почта не найдена. Попробуйте зарегистрироваться'
        }
        if (errorCode === 'auth/wrong-password') {
          self.validPassword = false
          self.errorText = 'Введен неверный пароль'
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
