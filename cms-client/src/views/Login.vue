<template>
    <div class="card col-4 mx-auto my-2">
      <div>
        <h1>Login</h1>
      </div>
      <div class="card-body d-flex flex-row">
        <form class="col-12" @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="email" id="email" type="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="caption">Password</label>
            <input v-model="password" id="caption" type="password" class="form-control" required />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-info">Submit</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const userLogin = {
        email: this.email,
        password: this.password
      }
      //   console.log(userLogin)
      this.$store.dispatch('login', userLogin)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
