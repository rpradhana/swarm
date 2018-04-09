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
              <b-button variant="light" class="mr-3 pt-0 pb-0" style="height: 34px">
                <i class="material-icons secondary-cta-link">remove_red_eye</i>
              </b-button>
              <!-- <b-button variant="primary" :to="{ path: '/contributor/projects/' + row.item._id, params: { id: row.item._id } }">
                Attempt
              </b-button> -->
              <b-form @submit.prevent="attempt(row.item._id)">
                <input id="id" type="hidden" :value="row.item._id" name="id" />
                <b-button type="submit" variant="primary">
                  Attempt
                </b-button>
              </b-form>
            </template>
            <template slot="row-details" slot-scope="row">
              <div class="details">
                <div class="mb-1">
                  <span class="mr-5">
                    <strong>Owner: </strong>{{ row.item.owner }}
                  </span>
                  <span class="mr-5">
                    <strong>Expiry: </strong>{{ row.item.expirationDate }}
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
      currentPage: 1,
      fields: [
        '#',
        { key: 'title', sortable: true },
        { key: 'type', sortable: true },
        { key: 'attempts', sortable: true },
        { key: 'incentive', sortable: true },
        { key: 'creationDate', sortable: true },
        '##'
      ]
      // ],
      // projects: [
      //   {
      //     id: '00000001',
      //     title: 'Classify the species of birds of paradise',
      //     type: 'Modelling',
      //     contributors: 10000,
      //     reward: 0.1,
      //     created: '1/03/2017',
      //     expiry: '3/04/2018',
      //     owner: 'John Doe',
      //     description: 'Given a set of images, identify visible features to find out the category of said image'
      //   },
      //   {
      //     id: '00000002',
      //     title: 'Identifying the species of birds',
      //     type: 'Prediction',
      //     contributors: 14,
      //     reward: 0.2,
      //     created: '3/12/2016',
      //     expiry: '3/04/2018',
      //     owner: 'John Doe',
      //     description: 'Given a set of images, identify visible features to find out the category of said image'
      //   },
      //   {
      //     id: '00000003',
      //     title: 'Identify features of sad and happy expressions',
      //     type: 'Prediction',
      //     contributors: 1850,
      //     reward: 0.1,
      //     created: '3/12/2016',
      //     expiry: '3/04/2018',
      //     owner: 'John Doe',
      //     description: 'Given a set of images, identify visible features to find out the category of said image'
      //   },
      //   {
      //     id: '00000004',
      //     title: 'Sort 3 types of our user feedback',
      //     type: 'Modelling',
      //     contributors: 10000,
      //     reward: 0.15,
      //     created: '1/03/2017',
      //     expiry: '3/04/2018',
      //     owner: 'John Doe',
      //     description: 'Given a set of images, identify visible features to find out the category of said image'
      //   },
      //   {
      //     id: '00000005',
      //     title: 'Categorize the feedback we received',
      //     type: 'Modelling',
      //     contributors: 10000,
      //     reward: 0.3,
      //     created: '1/03/2017',
      //     expiry: '3/04/2018',
      //     owner: 'John Doe',
      //     description: 'Given a set of images, identify visible features to find out the category of said image'
      //   }
      // ]
    }
  },
  methods: {
    async attempt (projectId) {
      try {
        await this.$store.dispatch('attempt', {
          id: projectId
        })
        this.$nuxt.$router.replace({ path: '/contributor/projects/' + projectId })
        // if (this.$store.state.attempt) {
        // }
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
