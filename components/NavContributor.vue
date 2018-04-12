<template>
  <nav class="nav sticky-top shadow">
    <b-container>
      <b-col>
        <b-row align-h="between">
          <div class="nav-brand">
            <nuxt-link to="/contributor/dashboard"><img src="~assets/img/swarm-logo.svg"></nuxt-link>
            <div class="nav-menu ml-3">
              <b-button variant="link" class="mr-3 nav-link" to="/contributor/dashboard">
                Dashboard
              </b-button>
              <b-button variant="link" class="mr-3 nav-link" to="/contributor/projects">
                Projects
              </b-button>
            </div>
          </div>
<!--           <div class="search">
            <b-form-input type="text"
                          placeholder="Search projects"/>
          </div> -->
          <div class="nav-menu">
            <!-- <b-button variant="link" class="ml-3 mr-5 nav-link">
            </b-button> -->
<!--             <b-button v-if="$store.state.attempt"
                      variant="primary"
                      :to="'/contributor/projects/' + $store.state.attempt.project._id"
                      class="ml-3 mr-3">
              Active session
            </b-button> -->
            <b-dropdown v-if="$store.state.attempt"
                        split
                        text="Active Session"
                        variant="primary"
                        @click="openSession"
                        class="ml-3 mr-3">
              <b-dropdown-item v-b-modal.sessionInfoModal>Session info</b-dropdown-item>
              <b-dropdown-item @click="endAttempt">End session</b-dropdown-item>
            </b-dropdown>
            <b-dropdown variant="link" right class="link-black ml-5">
              <template slot="button-content">
                ​<picture class="avatar">
                  <img src="https://placeimg.com/32/32/people" class="img-fluid img-thumbnail" alt="avatar">
                </picture>
              </template>
<!--               <b-dropdown-item @click.prevent="">Profile</b-dropdown-item> -->
              <b-dropdown-item @click="logout">Sign out</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-row>
      </b-col>
      <b-modal id="sessionInfoModal"
               v-model="btnShow"
               size="sm"
               title="Session info"
               centered>
        <b-container fluid>
          <b-row>
            <b-col cols="8"><strong>Session earnings: </strong></b-col>
            <b-col>1</b-col>
          </b-row>
          <b-row>
            <b-col cols="8"><strong>Task done: </strong></b-col>
            <b-col>1</b-col>
          </b-row>
          <b-row>
            <b-col cols="8"><strong>Time spent: </strong> </b-col>
            <b-col>1</b-col>
          </b-row>
        </b-container>
         <div slot="modal-footer" class="w-100">
           <b-btn class="float-right ml-3" variant="outline-danger" @click="endAttempt">
             End session
           </b-btn>
           <b-btn class="float-right" variant="light" @click="btnShow=false">
             Close
           </b-btn>
         </div>
      </b-modal>
    </b-container>
  </nav>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  name: 'Nav',
  fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      // return redirect('/welcome?a=sign-in')
    } else if (store.state.authUser.user.type !== 'contributor') {
      // return redirect('/')
    }
  },
  data () {
    return {
      btnShow: false
    }
  },
  async asyncData () {
    let { data } = await axios.get('/api/projects')
    for (var ii = 0; ii < data.projects.length; ii++) {
      data.projects[ii].creationDate = window.moment(data.projects[ii].creationDate).format('ll')
    }
    return data
  },
  methods: {
    openSession () {
      this.$nuxt.$router.replace({ path: '/contributor/projects/' + this.$store.state.attempt.project._id })
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
        if (!this.$store.state.authUser) {
          this.$nuxt.$router.replace({ path: '/' })
        }
      } catch (e) {
        this.form.errorMessage = e.message
      }
    },
    async endAttempt () {
      try {
        await this.$store.dispatch('endAttempt')
        this.btnShow = false
        if (!this.$store.state.attempt) {
          this.$nuxt.$router.replace({ path: '/contributor/dashboard' })
        }
      } catch (e) {
        this.form.errorMessage = e.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .link-black {
    color: $black;
    &::after {
      color: $black;
      margin-left: $spacer * 0.5;
    }
    &:hover {
      color: $dark;
    }
  }
  .nav {
    padding-top: $spacer * 0.5;
    padding-bottom: $spacer * 0.5;
    // position: fixed;
    width: 100%;
    background: $white;
    z-index: 100;
  }
  .nav-brand {
    display: flex;
    align-items: center;
  }
  .nav-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .nav-link {
    color: $black;
    text-decoration: none;
    margin-right: $spacer;

    &:hover {
      color: $primary;
    }
  }
  .avatar img{
    border: none;
    border-radius: 50%;
    padding: 0;
    position: absolute;
    left: -10%;
    top: 50%;
    transform: translate(-50%, -50%)
  }
  .search {
    flex-grow: 1;
  }
</style>