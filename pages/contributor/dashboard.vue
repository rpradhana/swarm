<template>
  <section class="v-container">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12">
          <h4 class="title mb-5">
            Past projects
          </h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="8" order-md="1" order-sm="2">
          <b-table class="mb-5"
                   hover
                   :current-page="currentPage"
                   :per-page="20"
                   :items="rows"
                   :fields="fields">
            <template slot="#" slot-scope="row">
              <b-button variant="link"
                        class="p-0"
                        @click.stop="row.toggleDetails">
                <i class="material-icons secondary-cta-link offset-min">expand_{{ row.detailsShowing ? 'more' : 'less'}}</i>
              </b-button>
            </template>
            <template slot="##" slot-scope="row">
              <b-button variant="light" class="mr-3">
                Preview
              </b-button>
              <b-button variant="primary" to="attempt">
                Attempt
              </b-button>
            </template>
            <template slot="row-details" slot-scope="row">
              <div class="details">
                <div class="mb-1">
                  <span class="mr-5">
                    <strong>Owner: </strong>{{ row.item.owner }}
                  </span>
                  <span class="mr-5">
                    <strong>Expiry: </strong>{{ row.item.expiry }}
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
                        :total-rows="rows.length"
                        :per-page="20"/>
        </b-col>
        <b-col sm="12" md="4" order-md="2" order-sm="1">
          <b-card class="shadow mb-5">
            <h5 class="mb-3">Available earnings: ${{ format('comma', totalEarnings) }}</h5>
            <b-button variant="primary">
              Transfer via Paypal
            </b-button>
          </b-card>
          <b-card class="shadow mb-5">
            <h5 class="mb-3">Overview</h5>
            <div>
              <strong>Attempts taken: </strong>{{ rows.length }}
            </div>
            <div>
              <strong>Task done: </strong>{{ attempts.length }}
            </div>
            <div>
              <strong>Total earnings: </strong>${{ format('comma', totalEarnings) }}
            </div>
          </b-card>
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
      return redirect('/welcome?a=sign-in')
    } else if (store.state.authUser.user.type === 'owner') {
      return redirect('/owner/dashboard')
    } else {
    }
  },
  async asyncData ({ store }) {
    if (store.state.authUser) {
      let { data } = await axios.get('/api/attemptsBy/' + store.state.authUser.user._id)
      console.log('INITIAL DATA', data)
      return data
    }
  },
  data () {
    return {
      currentPage: 1,
      fields: [
        { key: 'date', sortable: true },
        { key: 'title', sortable: true },
        { key: 'type', sortable: true },
        { key: 'tasks', sortable: true },
        { key: 'earnings', sortable: true }
      ]
    }
  },
  methods: {
    format (type, input) {
      switch (type) {
        case 'comma':
          return (Math.round(input * 100) / 100)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        case 'currency': return ('$' + input)
        case 'titleCase': return input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
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
