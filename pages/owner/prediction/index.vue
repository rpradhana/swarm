<template>
  <section class="v-container">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12">
          <h4 class="title mb-5">
            <nuxt-link to="dashboard"><i class="material-icons secondary-cta-link offset-min">chevron_left</i></nuxt-link>
            {{ project.title }}
          </h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="8" order-md="1" order-sm="2">
          <b-card id="dataset" class="shadow mb-5">
            <div class="mb-4">
              <h5 class="mb-3">Datasets provided: {{ format('comma', datasets.length) }}</h5>
              <b-button variant="light">
                Edit dataset
              </b-button>
            </div>
          </b-card>
          <b-card id="features" class="shadow mb-5">
            <div class="mb-4">
              <h5 class="mb-3">Results</h5>
              <b-button variant="primary">
                Download <code class="text-white">.csv</code>
              </b-button>
            </div>
            <div>
              <b-table class="mb-5"
                       striped
                       hover
                       :current-page="currentPage"
                       :per-page="20"
                       :items="results"
                       :fields="fields">
              </b-table>
              <b-pagination size="md"
                            v-model="currentPage"
                            align="right"
                            :total-rows="results.length"
                            :per-page="20"/>
            </div>
          </b-card>
        </b-col>
        <b-col sm="12" md="4" order-md="2" order-sm="1">
          <b-button class="w-100 mb-3"
                    variant="secondary"
                    size="lg">
            Project is {{ project.status }}
          </b-button>
          <b-button class="w-100 mb-3"
                    variant="primary"
                    size="lg">
            View model
          </b-button>
          <b-card id="basic-info" class="shadow mb-5">
            <div class="card-text">
              <div class="mb-3">
                <div v-if="project.type">
                  <strong>Type: </strong>
                  {{ project.type }}
                </div>
                <div v-if="project.contributors">
                  <strong>Contributors: </strong>
                  {{ format('comma', project.contributors) }}
                  <span v-if="project.contributorsLimit">/ {{ format('comma', project.contributorsLimit) }}</span>
                </div>
                <div v-if="project.expense">
                  <strong>Expense: </strong>
                  {{ format('currency', format('comma', project.expense)) }}
                </div>
                <div v-if="project.expensePerTask">
                  <strong>Expense/task: </strong>
                  {{ format('currency', format('comma', project.expensePerTask)) }}
                </div>
              </div>
              <div class="mb-3">
                <div v-if="project.latest">
                  <strong>Latest model: </strong>
                  {{ project.latest }}
                </div>
                <div v-if="project.quality">
                  <strong>Model quality: </strong>
                  {{ project.quality }}
                </div>
                <div v-if="project.results">
                  <strong>Results: </strong>
                  {{ format('comma', project.results) }}
                  <span v-if="project.resultsLimit">/ {{ format('comma', project.resultsLimit) }}</span>
                </div>
              </div>
              <div class="mb-3">
                <div v-if="project.description">
                  <strong>Description: </strong>
                  {{ format('comma', project.description) }}
                </div>
              </div>
              <div>
                <b-button variant="light">
                  Edit settings
                </b-button>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
// import axios from '~/plugins/axios'

export default {
  layout: 'owner',
  fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/welcome?a=sign-in')
    } else if (store.state.authUser.user.type !== 'owner') {
      return redirect('/')
    }
  },
  async asyncData () {
    // let { data } = await axios.get('/api/users')
    // return { users: data }
  },
  methods: {
    format (type, input) {
      switch (type) {
        case 'comma': return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        case 'currency': return ('$' + input)
      }
    }
  },
  data () {
    return {
      project: {
        id: '00000001',
        title: 'Identifying the species of birds',
        type: 'Prediction',
        contributors: 14,
        contributorsLimit: 1000,
        expense: 131.80,
        expensePerTask: 0.01,
        latest: '1/03/2017',
        quality: 'Good',
        status: 'Ongoing',
        description: 'Given the images of birds, identify the features of birds in the image.'
      },
      datasets: [
        {
          name: 'img0001',
          src: 'https://picsum.photos/128/128/?photo=1'
        },
        {
          name: 'img0002',
          src: 'https://picsum.photos/128/128/?photo=2'
        },
        {
          name: 'img0003',
          src: 'https://picsum.photos/128/128/?photo=3'
        },
        {
          name: 'img0004',
          src: 'https://picsum.photos/128/128/?photo=4'
        },
        {
          name: 'img0005',
          src: 'https://picsum.photos/128/128/?photo=5'
        }
      ],
      classes: [
        {
          class: 'Paradisaea apoda',
          src: 'https://picsum.photos/128/128/?photo=1'
        },
        {
          class: 'Paradisaea minor',
          src: 'https://picsum.photos/128/128/?photo=2'
        },
        {
          class: 'Paradisaea raggiana',
          src: 'https://picsum.photos/128/128/?photo=3'
        }
      ],
      fields: [
        { key: 'name', sortable: true },
        { key: 'label', sortable: true },
        { key: 'confidence', sortable: true }
      ],
      currentPage: 1,
      results: [
        {
          name: 'img-0000001.jpg',
          label: 'Paradisaea apoda',
          confidence: 0.9
        },
        {
          name: 'img-0000002.jpg',
          label: 'Paradisaea minor',
          confidence: 0.86
        },
        {
          name: 'img-0000003.jpg',
          label: 'Paradisaea minor',
          confidence: 0.88
        },
        {
          name: 'img-0000004.jpg',
          label: 'Paradisaea apoda',
          confidence: 0.92
        },
        {
          name: 'img-0000005.jpg',
          label: 'Paradisaea raggiana',
          confidence: 0.91
        },
        {
          name: 'img-0000006.jpg',
          label: 'Paradisaea apoda',
          confidence: 0.74
        },
        {
          name: 'img-0000007.jpg',
          label: 'Paradisaea apoda',
          confidence: 0.85
        }
      ]
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
      vertical-align: middle;
  }
</style>
