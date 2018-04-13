<template>
  <section class="v-container">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12">
          <h4 class="title mb-5">
            <nuxt-link to="/owner/dashboard"><i class="material-icons secondary-cta-link offset-min">chevron_left</i></nuxt-link>
            {{ data.project.title }}
          </h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="8" order-md="1" order-sm="2">
          <b-card id="dataset" class="shadow mb-5">
            <div class="mb-4">
              <h5 class="mb-3">Datasets provided: {{ format('comma', datasets.length) }}</h5>
              <b-button v-b-modal.datasetModal variant="light">
                Edit dataset
              </b-button>
            </div>

            <b-modal id="datasetModal"
                     size="lg"
                     v-model="btnShow"
                     title="Dataset"
                     centered>
              <b-container fluid>
                <b-row v-for="(label, index) in data.classes" :key="label.id">
                  <b-col cols="4">
                    <b-form-input id="classes"
                                  type="text"
                                  required
                                  v-model="label.class"
                                  :placeholder="data.project.classes[index]"/>
                  </b-col>
                  <b-col class="pl-0 pr-0">
                    <b-form-file multiple
                                 required
                                 class="text-truncate"
                                 v-model="label.trainingData"
                                 aria-describedby="fileCaption"
                                 placeholder="Upload files"/>
                    <b-form-text id="fileCaption" class="mt-0 mb-3">
                      Selected files: {{ label.trainingData.length }}
                    </b-form-text>
                  </b-col>
                  <b-col cols="1">
                    <b-btn class="p-0 float-right secondary-cta-link" variant="link" @click="removeClass()">
                      <i class="material-icons pt-1">close</i>
                    </b-btn>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-btn class="" variant="tertiary" @click="addClass">
                     Add class
                    </b-btn>
                  </b-col>
                </b-row>
              </b-container>
              <div slot="modal-footer" class="w-100">
                <b-btn class="float-right ml-3" variant="primary" @click="btnShow=false">
                 Update dataset
                </b-btn>
              </div>
            </b-modal>

            <div class="mb-4">
              <h5 class="mb-3">Sample classes</h5>
              <div class="clearfix">
                <img v-for="(c, index) in data.sampleClasses"
                     class="rounded float-left mr-2 mb-2 img-small-square-thumb"
                     :key="c.trainingData[index]"
                     :alt="c.class"
                     :id="'c-' + index"
                     :src="c.trainingData.path.substr(6)">
                <b-tooltip v-for="(c, index) in data.project.classes"
                           triggers="hover"
                           :key="c._id"
                           :target="'c-' + index"
                           :title="c">
                </b-tooltip>
              </div>
            </div>
<!--             <div>
              <b-button variant="light">
                Edit classes
              </b-button>
            </div> -->
          </b-card>
          <b-card id="features" class="shadow mb-5">
            <div class="mb-4">
              <h5 class="mb-3">List of features</h5>
<!--               <b-button variant="light">
                Edit features
              </b-button> -->
            </div>
            <div>
              <b-table striped hover :items="features" :fields="fields"/>
              <!-- <b-table striped hover :items="data.features" :fields="fields"/> -->
            </div>
          </b-card>
        </b-col>
        <b-col sm="12" md="4" order-md="2" order-sm="1">
          <b-button class="w-100 mb-3"
                    v-if="project.status === 'Ongoing'"
                    variant="secondary"
                    @click="startPause"
                    size="lg">
            Project is {{ project.status }}
          </b-button>
          <b-button class="w-100 mb-3"
                    v-else-if="project.status === 'Paused'"
                    variant="tertiary"
                    @click="startPause"
                    size="lg">
            Project is {{ project.status }}
          </b-button>
          <b-button class="w-100 mb-3"
                    v-else-if="project.status === 'disabled'"
                    variant="disabled"
                    @click="startPause"
                    size="lg">
            Project is {{ project.status }}
          </b-button>
          <b-button class="w-100 mb-3"
                    variant="primary"
                    v-b-modal.modelModal
                    size="lg">
            View model
          </b-button>

          <b-modal class=""
                   id="modelModal"
                   title="Feature matrix"
                   centered
                   v-model="modelShow"
                   size="lg">
            <b-container>
              <b-row>
                <b-col>
                  <b-table striped hover :items="featureMatrix">
                  </b-table>
<!--                   {{ data.project.classes }}
                  {{ data.features }} -->
                </b-col>
              </b-row>
            </b-container>
            <div slot="modal-footer" class="w-100">
              <b-btn class="float-right ml-3" variant="primary" @click="modelShow=false">
               Close
              </b-btn>
            </div>
          </b-modal>

          <b-card id="basic-info" class="shadow mb-5">
            <div class="card-text">
              <div class="mb-3">
                <div>
                  <strong>Type: </strong>
                  {{ format('titleCase', data.project.type) }}
                </div>
                <div>
                  <strong>Contributors: </strong>
                  {{ format('comma', data.project.contributor) }}
                </div>
                <div>
                  <strong>Attempts: </strong>
                  {{ format('comma', data.project.attempts) }}
                  <span>/ {{ format('comma', data.project.attemptsLimit) }}</span>
                </div>
                <div v-if="project.expense">
                  <strong>Expense: </strong>
                  {{ format('currency', format('comma', data.project.expense)) }}
                </div>
                <div>
                  <strong>Incentive: </strong>
                  {{ format('currency', format('comma', data.project.incentive)) }}
                </div>
              </div>
              <div class="mb-3">
                <div>
                  <strong>Latest model: </strong>
                  {{ data.project.modelDate ? data.project.modelDate : '-' }}
                </div>
                <div>
                  <strong>Model quality: </strong>
                  {{ data.project.modelQuality ? data.project.modelQuality : '-' }}
                </div>
                <div>
                  <strong>Results: </strong>
                  {{ format('comma', data.project.attempts) }}
                  <span>/ {{ format('comma', data.project.attemptsLimit) }}</span>
                </div>
              </div>
              <div class="mb-3">
                <div v-if="project.description">
                  <strong>Description: </strong>
                  {{ format('comma', data.project.description) }}
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
  async asyncData ({ store }) {
    console.log(store.state.project.project._id)
    let { data } = await axios.get('/api/modelling/' + store.state.project.project._id)
    console.log('Initial data', data)
    return { data }
  },
  methods: {
    format (type, input) {
      switch (type) {
        case 'comma': return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        case 'currency': return ('$' + input)
        case 'titleCase': return input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
      }
    },
    addClass () {
      this.classCount++
      this.btnDisableRemove = false
      this.data.classes.push({
        class: '',
        index: this.classCount,
        trainingData: ''
      })
      console.log('class = ' + this.classCount)
    },
    removeClass (index) {
      if (this.classCount >= 1) {
        this.classCount--
        this.data.classes.splice(index, 1)
      } else {
        this.btnDisableRemove = true
      }
      console.log('class = ' + this.classCount)
    },
    async startPause () {
      switch (this.project.status) {
        case 'Ongoing': {
          this.project.status = 'Paused'

          let statusUpdate = {
            projectId: this.id,
            status: this.project.status
          }

          await axios.post('/api/status', statusUpdate)
            .then((response) => {
              console.log(response)
            })
            .catch((error) => {
              console.log(error)
            })
          break
        }
        case 'Paused': {
          this.project.status = 'Ongoing'

          let statusUpdate = {
            projectId: this.id,
            status: this.project.status
          }

          await axios.post('/api/status', statusUpdate)
            .then((response) => {
              console.log(response)
            })
            .catch((error) => {
              console.log(error)
            })
          break
        }
        case 'Done': {
          break
        }
      }
    }
  },
  data () {
    return {
      classCount: 0,
      btnDisableRemove: false,
      modelShow: false,
      btnShow: false,
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
      featureMatrix: [
        { class: 'Falcon', f1: '1', f2: '1', f3: '1', f4: '0', f5: '1' },
        { class: 'Hawk', f1: '1', f2: '0', f3: '1', f4: '0', f5: '0' },
        { class: 'Eagle', f1: '1', f2: '1', f3: '0', f4: '1', f5: '1' }
      ],
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
  .img-small-square-thumb {
    height: 150px;
    width: 150px;
  }
  .secondary-cta-link {
    color: $gray-600;
      vertical-align: middle;
  }
</style>
