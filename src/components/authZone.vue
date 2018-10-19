<template>
  <div>
    <h1>Вы в авторизованной зоне</h1>
    <div class="text-wrap">
      <b>Последний вход:</b> {{ user.metadata.lastSignInTime }}<br>
      <b>Дата регистрации:</b> {{ user.metadata.creationTime }}<br>
      <b>Email:</b> {{ user.email }}<br>
      <b>ID:</b> {{ user.uid }}<br>
    </div>
   <a href @click="logout">Разлогиниться</a>
  </div>
</template>

<script>
import { auth } from '../main'
export default {
  name: 'authZone',
  data () {
    return {
      user: {
        metadata: {},
        email: '',
        uid: ''
      }
    }
  },
  mounted: function () {
    var self = this
    auth.onAuthStateChanged(function (user) {
      if (user) {
        self.user = user
      } else {
        self.$router.push('/')
      }
    })
  },
  methods: {
    logout () {
      var self = this
      auth.signOut().then(function () {
        self.$router.push('/')
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
  margin-top: 30px;
  display: inline-block;
}

.text-wrap{
  text-align: left;
  width: 400px;
  margin: auto;
}
</style>
