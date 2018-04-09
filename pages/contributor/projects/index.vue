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
                   :current-page="currentPage"
                   :per-page="20"
                   :items="projects"
                   :fields="fields">
            <template slot="#" slot-scope="row">
              <b-button variant="link"
                        class="p-0"
                        @click.stop="row.toggleDetails">
                <i class="material-icons secondary-cta-link offset-min">expand_{{ row.detailsShowing ? 'more' : 'less'}}</i>
              </b-button>
            </template>
            <template slot="##" slot-scope="row">
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
                    <strong>Expiry: </strong>{{ (row.item.expiryDate !== 'null') ? row.item.expiryDate : 'No time limit' }}
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
    </b-container>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  layout: 'contributor',
  fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      // return redirect('/welcome?a=sign-in')
    } else if (store.state.authUser.user.type !== 'contributor') {
      // return redirect('/')
    }
  },
  async asyncData () {
    let { data } = await axios.get('/api/projects')
    console.log(data)
    return data
  },
  data () {
    return {
      form: {
        id: ''
      },
      fields: [
        '#',
        { key: 'title', sortable: true },
        { key: 'type', sortable: true },
        { key: 'attempts', sortable: true },
        { key: 'incentive', sortable: true },
        { key: 'creationDate', sortable: true },
        '##'
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
          alert('You have another active session.')
        }
      } catch (e) {
        alert('Failed to attempt project 2')
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
</style>
