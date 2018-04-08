<template>
  <section class="v-container u-flex-center">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12" md="6" offset-md="3">
          <h3 v-if="this.$route.query.u === 'owner'"
              class="title mb-5">
            <nuxt-link to="welcome?u=owner"><i class="material-icons offset-min secondary-cta-link">chevron_left</i></nuxt-link>
            Register as Owner
          </h3>
          <h3 v-else
              class="title mb-5">
            <nuxt-link to="welcome?u=contributor"><i class="material-icons offset-min secondary-cta-link">chevron_left</i></nuxt-link>
            Register as Contributor
          </h3>
          <b-form v-if="show" @submit.prevent="register">
            <b-form-group id="nameGroup"
                          class="mb-4"
                          label="Name"
                          label-for="nameGroup">
              <b-form-input id="name"
                            type="name"
                            v-model="form.name"
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
                            v-model="form.rePassword"
                            required
                            placeholder="Re-enter your password">
              </b-form-input>
            </b-form-group>
            <b-form-group id="paypalGroup"
                          class="mb-4"
                          label="Paypal"
                          label-for="paypalGroup">
              <b-form-input id="paypal"
                            type="text"
                            v-model="form.paypal"
                            required
                            placeholder="Enter your Paypal email">
              </b-form-input>
            </b-form-group>
            <b-button class="mt-1 mr-3" type="submit" variant="primary">Register</b-button>
            <span class="small secondary-cta-link">Have an account?
              <nuxt-link v-if="this.$route.query.u === 'owner'"
                         to="sign-in?=owner">
                Sign in.
              </nuxt-link>
              <nuxt-link v-else
                         to="sign-in?=contributor">
                Sign in.
              </nuxt-link>
            </span>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        paypal: '',
        type: '',
        errorMessage: null
      },
      show: true
    }
  },
  methods: {
    async register () {
      let newUser = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
        rePassword: this.form.rePassword,
        paypal: this.form.paypal,
        type: (this.$route.query.u === 'owner') ? 'owner' : 'contributor'
      }

      axios.post('/api/users/', newUser)
        .then((response) => {
          console.log(response)
        })
        .then(() => {
          this.$nuxt.$router.replace({ path: '/' })
        })
        .catch((error) => {
          console.log(error)
        })
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
