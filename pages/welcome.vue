<template>
  <section class="v-container u-flex-center">
    <b-container class="pb-7 pt-5">
      <b-row class="text-center mb-5">
        <b-col sm="12">
          <h3 class="title" v-if="this.$route.query.a === 'register'">
            Create new account
          </h3>
          <h3 class="title"
              v-else>
            Welcome back
          </h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6" xl="3" offset-xl="3">
          <b-card id="owner"
                  title="Owner"
                  img-src="img/owner.svg"
                  img-alt="Owner"
                  img-top
                  class="shadow">
            <p class="card-text mb-4">
              Create and manage data classification projects.
            </p>
            <b-button v-if="this.$route.query.a === 'register'"
                      variant="primary"
                      to="register?u=owner">
              Register as Owner
            </b-button>
            <b-button v-else
                      variant="primary"
                      to="sign-in?u=owner">
              Sign in as Owner
            </b-button>
          </b-card>
        </b-col>
        <b-col sm="12" md="6" xl="3">
          <b-card id="contributor"
                  title="Contributor"
                  img-src="img/contributor.svg"
                  img-alt="Contributor"
                  img-top
                  class="shadow">
            <p class="card-text mb-4">
              Do simple tasks and receive incentive money.
            </p>
            <b-button v-if="this.$route.query.a === 'register'"
                      variant="secondary"
                      to="register?u=contributor">
              Register as Contributor
            </b-button>
            <b-button v-else
                      variant="secondary"
                      to="sign-in?u=contributor">
              Sign in as Contributor
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
// import axios from '~/plugins/axios'

export default {
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
  #owner .card-img-top {
    background: $primary;
    min-height: 12rem;
    padding: $spacer * 2 $spacer * 4;
  }

  #contributor .card-img-top {
    background: $secondary;
    min-height: 12rem;
    padding: $spacer * 2 $spacer * 4;
  }
  .card {
    height: 100%;
  }
  @include media-breakpoint-down(sm) {
    .card-img-top {
      display: none;
    }
  }
</style>
