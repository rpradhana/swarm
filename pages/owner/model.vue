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
            <div class="mb-4">
              <h5 class="mb-3">Predefined classes</h5>
              <div class="clearfix">
                <img v-for="(c, index) in classes"
                     class="rounded float-left mr-2 mb-2"
                     :key="c._id"
                     :alt="c.class"
                     :id="'c-' + index"
                     :src="c.src">
                <b-tooltip v-for="(c, index) in classes"
                           triggers="hover"
                           :key="c._id"
                           :target="'c-' + index"
                           :title="c.class">
                </b-tooltip>
              </div>
            </div>
            <div>
              <b-button variant="light">
                Edit classes
              </b-button>
            </div>
          </b-card>
          <b-card id="features" class="shadow mb-5">
            <div class="mb-4">
              <h5 class="mb-3">List of features</h5>
              <b-button variant="light">
                Edit features
              </b-button>
            </div>
            <div>
              <b-table striped hover :items="features" :fields="fields"/>
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
import axios from '~/plugins/axios'
import ProjectGridItem from '~/components/ProjectGridItem.vue'

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
    let { data } = await axios.get('/api/projects')

    return { users: data }
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
        title: 'Classify the species of birds of paradise',
        type: 'Modelling',
        contributors: 10000,
        contributorsLimit: 15000,
        expense: 131.80,
        expensePerTask: 0.01,
        latest: '1/03/2017',
        quality: 'Good',
        status: 'Ongoing',
        description: 'Given the images of birds identify the existence of certain features to classify its exact species.'
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
        { key: 'feature', sortable: false },
        { key: 'values', sortable: false },
        { key: 'occurence', sortable: true }
      ],
      features: [
        {
          feature: 'Pattern',
          values: ['Plain', 'Red stripes', '3 colors'],
          occurence: 332
        },
        {
          feature: 'Split tail',
          values: [true, false],
          occurence: 124
        },
        {
          feature: 'Crown',
          values: [true, false],
          occurence: 62
        },
        {
          feature: 'Curly claw',
          values: [true, false],
          occurence: 32
        },
        {
          feature: 'Long tail',
          values: [true, false],
          occurence: 18
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
    ProjectGridItem
  }
}
</script>

<style lang="scss" scoped>
  .secondary-cta-link {
    color: $gray-600;
      vertical-align: middle;
  }
</style>
