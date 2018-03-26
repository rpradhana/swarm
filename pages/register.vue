<template>
  <section class="v-container u-flex-center">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12" md="6" offset-md="3">
          <h3 class="title mb-5">
            <nuxt-link to="welcome"><i class="material-icons offset-min secondary-cta-link">chevron_left</i></nuxt-link>
            Register as Contributor
          </h3>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="nameGroup"
                          class="mb-4"
                          label="Name"
                          label-for="nameGroup">
              <b-form-input id="name"
                            type="text"
                            v-model="form.text"
                            required
                            placeholder="Enter your full name">
              </b-form-input>
            </b-form-group>
            <b-form-group id="emailGroup"
                          class="mb-4"
                          label="Email address"
                          label-for="emailGroup">
              <b-form-input id="email"
                            type="email"
                            v-model="form.email"
                            required
                            placeholder="Enter your email">
              </b-form-input>
            </b-form-group>
            <b-form-group id="passwordGroup"
                          class="mb-4"
                          label="Password"
                          label-for="passwordGroup">
              <b-form-input id="password"
                            class="mb-2"
                            type="password"
                            v-model="form.password"
                            required
                            placeholder="Enter your password">
              </b-form-input>
              <b-form-input id="re-password"
                            type="password"
                            v-model="form.password"
                            required
                            placeholder="Re-enter your password">
              </b-form-input>
            </b-form-group>
            <b-form-group id="paypalGroup"
                          class="mb-4"
                          label="Paypal"
                          label-for="paypalGroup">
              <b-form-input id="name"
                            type="text"
                            v-model="form.text"
                            required
                            placeholder="Enter your Paypal email">
              </b-form-input>
            </b-form-group>
            <b-button class="mt-1 mr-3" type="submit" variant="primary">Register</b-button>
            <span class="small secondary-cta-link">Have an account? <a href="#">Sign in.</a></span>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
// import axios from '~/plugins/axios'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.password = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    }
  },
  async asyncData () {
    // let { data } = await axios.get('/api/users')
    // return { users: data }
  },
  head () {
    return {
      title: 'Swarm'
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
  .secondary-cta-link {
    color: $gray-600;
    & a {
      color: $gray-600;
      text-decoration: underline;
    }
  }
  .offset-min {
    position: absolute;
    left: -1.5rem;
    top: 0.5rem;
    font-size: 2rem;
  }
</style>
