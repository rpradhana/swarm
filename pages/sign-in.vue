<template>
  <section class="v-container u-flex-center">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12" md="6" offset-md="3">
          <h3 v-if="this.$route.query.u === 'owner'"
              class="title mb-5">
            <nuxt-link to="welcome?u=owner"><i class="material-icons offset-min secondary-cta-link">chevron_left</i></nuxt-link>
            Sign in as Owner
          </h3>
          <h3 v-else
              class="title mb-5">
            <nuxt-link to="welcome?u=contributor"><i class="material-icons offset-min secondary-cta-link">chevron_left</i></nuxt-link>
            Sign in as Contributor
          </h3>
          <b-form v-if="show" @submit.prevent="login">
            <b-form-group id="emailGroup"
                          class="mb-4"
                          label="Email address"
                          label-for="emailGroup">
              <b-form-input id="email"
                            type="email"
                            v-model="form.email"
                            required
                            :state="emailState"
                            aria-describedby="emailFeedback"
                            placeholder="Enter your email">
              </b-form-input>
              <!-- <b-form-invalid-feedback id="emailFeedback">
                {{ form.emailErrorMsg }}
              </b-form-invalid-feedback> -->
            </b-form-group>
            <b-form-group id="passwordGroup"
                          class="mb-4"
                          label="Password"
                          label-for="passwordGroup">
              <b-form-input id="password"
                            type="password"
                            v-model="form.password"
                            required
                            :state="passwordState"
                            aria-describedby="passwordFeedback"
                            placeholder="Enter your password">
              </b-form-input>
              <b-form-invalid-feedback id="passwordFeedback">
                {{ form.passwordErrorMsg }}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-button class="mt-1 mr-3" type="submit" variant="primary">Sign In</b-button>
            <span class="small secondary-cta-link">New user?
              <nuxt-link v-if="this.$route.query.u === 'owner'"
                         to="register?=owner">
                Create free account.
              </nuxt-link>
              <nuxt-link v-else
                         to="register?=contributor">
                Create free account.
              </nuxt-link>
            </span>
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
        password: '',
        emailErrorMsg: null,
        passwordErrorMsg: null
      },
      show: true
    }
  },
  async asyncData () {
    // let { data } = await axios.get('/api/users')
    // return { users: data }
  },
  computed: {
    emailState () {
      if (this.form.emailErrorMsg) {
        return false
      } else {
        return null
      }
    },
    passwordState () {
      if (this.form.passwordErrorMsg) {
        return false
      } else {
        return null
      }
    }
  },
  methods: {
    async login () {
      var type = (this.$route.query.u === 'owner') ? 'owner' : 'contributor'
      try {
        await this.$store.dispatch('login', {
          email: this.form.email,
          password: this.form.password,
          type: type
        })
        this.form.email = ''
        this.form.password = ''
        this.form.emailErrorMsg = null
        this.form.passwordErrorMsg = null
        if (this.$store.state.authUser) {
          this.$nuxt.$router.replace({ path: type + '/dashboard' })
        }
      } catch (e) {
        this.form.emailErrorMsg = 'Invalid email address'
        this.form.passwordErrorMsg = 'Invalid login credentials'
      }
    }
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
