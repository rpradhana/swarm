<template>
  <section class="v-container">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12">
          <h4 class="title mb-5">
            All project
          </h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12">
          <b-table class="mb-5"
                   hover
                   responsive
                   :current-page="currentPage"
                   :per-page="20"
                   :items="projects"
                   :fields="fields">
            <template slot="details" slot-scope="row">
              <b-button variant="link"
                        class="p-0"
                        @click.stop="row.toggleDetails">
                <i class="material-icons secondary-cta-link offset-min">expand_{{ row.detailsShowing ? 'more' : 'less'}}</i>
              </b-button>
            </template>
            <template slot="creationDate" slot-scope="data">
              <!-- A custom formatted data column cell -->
              {{ data.value }}
            </template>
            <template slot="action" slot-scope="row">
<!--               <b-button variant="light" class="mr-3 pt-0 pb-0" style="height: 34px">
                <i class="material-icons secondary-cta-link">remove_red_eye</i>
              </b-button> -->
              <!-- <b-button variant="primary" :to="{ path: '/contributor/projects/' + row.item._id, params: { id: row.item._id } }">
                Attempt
              </b-button> -->
              <b-form @submit.prevent="attempt(row.item._id)">
                <input type="hidden" :value="row.item._id" name="id" />
                <b-button v-if="!$store.state.attempt" class="float-right" type="submit" variant="primary">
                  Attempt
                </b-button>
                <b-button v-else class="float-right" type="submit" variant="disabled">
                  Attempt
                </b-button>
              </b-form>
            </template>
            <template slot="row-details" slot-scope="row">
              <div class="details">
                <div class="mb-1">
                  <span class="mr-5">
                    <strong>Owner: </strong>{{ row.item.ownerName }}
                  </span>
                  <span class="mr-5">
                    <strong>Expiry: </strong>{{ (!row.item.expiryDate) ? row.item.expiryDate : 'No time limit' }}
                  </span>
                </div>
                <div>
                  <span>
                    {{ row.item.description }}
                  </span>
                </div>
              </div>
            </template>
          </b-table>
          <b-pagination size="md"
                        v-model="currentPage"
                        align="right"
                        :total-rows="projects.length"
                        :per-page="20"/>
        </b-col>
      </b-row>

      <!-- Modal Component -->
      <b-modal centered ref="attemptExistsModal" id="attemptExistsModal" title="You have an active session">
        <b-container>
          <b-row>
            <p>You can only attempt one project at the same time.</p>
          </b-row>
        </b-container>
        <div slot="modal-footer" class="w-100">
          <b-btn v-if="$store.state.attempt"
                 class="float-right ml-3"
                 variant="primary"
                 :to="'/contributor/projects/' + $store.state.attempt.project._id">
            Open session
          </b-btn>
          <b-btn v-else
                 class="float-right ml-3"
                 variant="primary"
                 :to="'/contributor/projects/'">
            Open session
          </b-btn>
          <b-btn class="float-right" variant="light" @click="btnShow=false">
            Cancel
          </b-btn>
          <b-btn class="float-left" variant="outline-danger" @click="endAttempt">
            End session
          </b-btn>
        </div>
      </b-modal>
    </b-container>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  layout: 'contributor',
  fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/welcome?a=sign-in')
    } else if (store.state.authUser.user.type === 'owner') {
      return redirect('/owner/dashboard')
    } else {
    }
  },
  async asyncData () {
    let { data } = await axios.get('/api/projects/active')
    console.log(data)
    for (var ii = 0; ii < data.projects.length; ii++) {
      data.projects[ii].creationDate = window.moment(data.projects[ii].creationDate).format('ll')
    }
    return data
  },
  data () {
    return {
      form: {
        id: ''
      },
      fields: [
        { key: 'details', label: ' ', sortable: false },
        { key: 'title', sortable: true },
        { key: 'type', sortable: true },
        { key: 'attempts', sortable: true },
        { key: 'incentive', sortable: true },
        { key: 'creationDate', label: 'Created', sortable: true },
        { key: 'action', label: ' ', sortable: false }
      ]
    }
  },
  props: {
    currentPage: 1
  },
  methods: {
    async attempt (projectId) {
      console.log(projectId)
      try {
        if (!this.$store.state.attempt) {
          await this.$store.dispatch('attempt', {
            id: projectId
          })
          this.$nuxt.$router.replace({ path: '/contributor/projects/' + projectId })
        } else {
          this.$refs.attemptExistsModal.show()
          // alert('You have another active session.')
        }
      } catch (e) {
        alert('Failed to attempt project')
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
  },
  computed: {
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
</style>
