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
              <h5 class="mb-3">Datasets provided: <!-- {{ format('comma', datasets.length) }} --></h5>
              <b-button v-b-modal.datasetModal variant="light">
                Edit dataset
              </b-button>
            </div>

            <b-modal id="datasetModal"
                     size="lg"
                     v-model="btnShow"
                     title="Dataset"
                     centered>
              <b-form @submit.prevent="updateDataset"
                      enctype="multipart/form-data">
                <b-container fluid>
                  <b-row v-for="(label, index) in data.classes" :key="label.id">
                    <b-col cols="4">
                      <b-form-input id="classes"
                                    type="text"
                                    required
                                    v-model="label.class"
                                    :placeholder="'Class '+ (index + 1)"/>
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
                    <b-col cols="1" v-if="index >= data.project.classes.length">
                    <!-- <b-col cols="1"> -->
                      <b-btn class="p-0 float-right secondary-cta-link"
                             variant="link"
                             @click="removeClass(index)">
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
              </b-form>
              <div slot="modal-footer" class="w-100">
                <b-btn type="submit" class="float-right ml-3" variant="primary" @click="updateDataset">
                 Update dataset
                </b-btn>
              </div>
            </b-modal>

            <div class="mb-4">
              <h5 class="mb-3">Sample classes ({{data.project.classes.length}})</h5>
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
              <b-table responsive striped hover :items="data.features" :fields="fields"/>
              <!-- <b-table striped hover :items="data.features" :fields="fields"/> -->
            </div>
          </b-card>
        </b-col>
        <b-col sm="12" md="4" order-md="2" order-sm="1">
          <b-button class="w-100 mb-3"
                    v-if="data.project.status === 'Ongoing'"
                    variant="secondary"
                    @click="startPause"
                    size="lg">
            Project is {{ data.project.status }}
          </b-button>
          <b-button class="w-100 mb-3"
                    v-else-if="data.project.status === 'Paused'"
                    variant="tertiary"
                    @click="startPause"
                    size="lg">
            Project is {{ data.project.status }}
          </b-button>
          <b-button class="w-100 mb-3"
                    v-else-if="data.project.status === 'disabled'"
                    variant="disabled"
                    @click="startPause"
                    size="lg">
            Project is {{ data.project.status }}
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
                  <b-table responsive striped hover :items="data.model" :fields="data.modelFields">
                    <template slot="f1" slot-scope="data">
                      {{ data.value }}
                    </template>
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
                <div>
                  <strong>Expense: </strong>
                  {{ format('currency', format('comma', data.project.attempts * data.project.incentive)) }}
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
                <div>
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
    } else if (store.state.authUser.user.type === 'contributor') {
      return redirect('/contributor/dashboard')
    } else {
    }
  },
  async asyncData ({ store }) {
    console.log(store.state.project.project._id)
    let { data } = await axios.get('/api/project/modelling/' + store.state.project.project._id)
    console.log('Initial data', data)
    return { data }
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
    },
    addClass () {
      // this.classCount++
      this.btnDisableRemove = false
      this.data.classes.push({
        class: '',
        index: this.data.classes.length,
        trainingData: ''
      })
      console.log('class = ' + this.data.classes.length)
    },
    removeClass (index) {
      if (this.data.classes.length > 1) {
        // this.classCount--
        this.data.classes.splice(index, 1)
      } else {
        this.btnDisableRemove = true
      }
      console.log('class = ', this.data.classes)
    },
    async updateDataset () {
      let formData = new FormData()
      formData.append('projectId', this.data.project._id)

      // For each class
      this.data.classes.some((c, index) => {
        formData.append('classes', c.class)

        // For each training data in every class
        if (c.trainingData) {
          c.trainingData.some((tr, index) => {
            formData.append('tr-' + index, tr)
          })
        }
      })

      // let datasetUpdate = {
      //   projectId: this.data.project._id,
      //   classes: this.data.classes
      // }
      axios.post(
        '/api/project/update/dataset',
        formData,
        { headers: { 'content-type': 'multipart/form-data; boundary=X' } })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      this.btnShow = false
      // axios.post(
      //   '/api/projects/',
      //   formData,
      //   { headers: { 'content-type': 'multipart/form-data; boundary=X' } }
      // ).then((response) => {
      //   this.btnShow = false
      // }).catch((error) => {
      //   console.log(error)
      // })
      this.btnShow = false
    },
    async startPause () {
      console.log(this.data.project.status)
      switch (this.data.project.status) {
        case 'Ongoing': {
          this.data.project.status = 'Paused'
          break
        }
        case 'Paused': {
          this.data.project.status = 'Ongoing'
          break
        }
        case 'Done': {
          break
        }
      }
      let statusUpdate = {
        projectId: this.data.project._id,
        status: this.data.project.status
      }
      if (this.data.project.status !== 'Done') {
        await axios.post('/api/project/update/status', statusUpdate)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
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
        type: 'Modelling'
      },
      featureMatrix: [
        { class: 'apoda', f1: ['yellow', 'yellow'], f2: '0', f3: '1', f4: 'smooth', f5: '1' },
        { class: 'decora', f1: 'yellow', f2: '0', f3: '0', f4: 'ragged', f5: '0' },
        { class: 'guiliermi', f1: 'white', f2: '1', f3: '0', f4: 'ragged', f5: '1' },
        { class: 'minor', f1: 'yellow', f2: '0', f3: '1', f4: 'thick', f5: '1' },
        { class: 'raggiana', f1: 'brown', f2: '0', f3: '0', f4: 'thin', f5: '1' },
        { class: 'rubra', f1: 'red', f2: '0', f3: '1', f4: 'thin', f5: '1' },
        { class: 'decora', f1: 'yellow', f2: '0', f3: '0', f4: 'thin', f5: '0' }
      ],
      matrixFields: [
        { key: 'class' },
        { key: 'f1' },
        { key: 'f2' }
      ],
      fields: [
        { key: 'feature', sortable: false },
        { key: 'values', sortable: false },
        { key: 'occurence', sortable: true }
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
