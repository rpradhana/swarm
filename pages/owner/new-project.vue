<template>
  <section class="v-container u-flex-center">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12" md="6" offset-md="3">
          <h3 class="title mb-5">
            <nuxt-link to="dashboard"><i class="material-icons offset-min secondary-cta-link">chevron_left</i></nuxt-link>
            Create new project
          </h3>
          <b-form v-if="show"
                  @submit.prevent="newProject"
                  enctype="multipart/form-data">
            <b-form-group id="titleGroup"
                          class="mb-4"
                          label="Title*"
                          label-for="titleGroup">
              <b-form-input id="title"
                            type="text"
                            required
                            v-model="Project.title"
                            :state="titleState"
                            placeholder="Enter project title"/>
            </b-form-group>
            <b-form-group id="descriptionGroup"
                          class="mb-4"
                          label="Description*"
                          label-for="descriptionGroup">
              <b-form-textarea id="description"
                               required
                               :state="descriptionState"
                               :rows="4"
                               :max-rows="6"
                               v-model="Project.description"
                               placeholder="Enter project description"/>
            </b-form-group>

            <b-form-group id="typeGroup"
                          class="mb-4"
                          label="Type*"
                          label-for="typeGroup">
              <b-form-radio-group v-model="Project.typeSelected"
                                  :options="Project.typeOptions"
                                  stacked
                                  name="radiosStacked">
              </b-form-radio-group>
            </b-form-group>

            <b-form-group id="datasetGroup"
                          class="mb-4"
                          label="Dataset*"
                          label-for="datasetGroup">
              <b-input-group>
                <b-btn v-b-modal.datasetModal variant="tertiary">Edit dataset</b-btn>
              </b-input-group>
            </b-form-group>

            <b-modal id="datasetModal"
                     size="lg"
                     v-model="btnShow"
                     title="Dataset"
                     centered>
              <b-container fluid>
<!--                 <b-row>
                  <b-col>
                    <b-form-group id="classCountGroup"
                                  class="mb-4"
                                  label="Number of classes"
                                  label-for="classCountGroup"
                                  required>
                      <b-input-group>
                        <b-form-input id="classCount"
                                      type="number"
                                      required
                                      :value="classCount"
                                      min="1"
                                      step="1"
                                      required
                                      @change="updateClassCount(classCount)"
                                      v-model="classCount">
                        </b-form-input>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                </b-row> -->
                <b-row v-for="(label, index) in Project.classes" :key="label.id">
                  <b-col cols="4" v-if="Project.typeSelected === 'modelling'">
                    <b-form-input id="classes"
                                  type="text"
                                  v-model="label.class"
                                  :placeholder="'Class ' + (index + 1)"/>
                  </b-col>
                  <b-col class="pl-0 pr-0" v-if="Project.typeSelected === 'modelling'">
                    <b-form-file multiple
                                 class="text-truncate"
                                 v-model="label.trainingData"
                                 aria-describedby="fileCaption"
                                 placeholder="Upload files"/>
                    <b-form-text id="fileCaption" class="mt-0 mb-3">
                      Selected files: {{ label.trainingData.length }}
                    </b-form-text>
                  </b-col>
                  <b-col class="pl-0 pr-0" v-else-if="Project.typeSelected === 'prediction'">
                    <b-form-file multiple
                                 class="text-truncate"
                                 v-model="label.testData"
                                 aria-describedby="fileCaption2"
                                 placeholder="Upload files"/>
                    <b-form-text id="fileCaption2" class="mt-0 mb-3">
                      Selected files: {{ label.testData.length }}
                    </b-form-text>
                  </b-col>
                  <b-col cols="1" v-if="Project.typeSelected === 'modelling'">
                    <b-btn class="p-0 float-right secondary-cta-link" variant="link" @click="removeClass()">
                      <i class="material-icons pt-1">close</i>
                    </b-btn>
                  </b-col>
                </b-row>
                <b-row v-if="Project.typeSelected === 'modelling'">
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

<!--             <b-modal id="datasetModal"
                     size="lg"
                     title="Dataset"
                     centered>
              <b-container fluid>

              </b-container>
               <div slot="modal-footer" class="w-100">
                 <b-btn class="float-right" variant="light" @click="btnShow=false">
                   Close
                 </b-btn>
               </div>
            </b-modal> -->

<!--             <b-form-group id="datasetGroup"
                          class="mb-4"
                          label="Dataset"
                          label-for="datasetGroup">
              <b-form-input id="classes"
                            class="mb-2"
                            type="text"
                            required
                            v-model="Project.classes[0].class"
                            placeholder="Enter project classes"/>
              <b-form-file multiple
                           required
                           class="text-truncate"
                           v-model="Project.testData"
                           aria-describedby="fileCaption"
                           placeholder="Upload files"/>
              <b-form-text id="fileCaption">
                Selected files: {{ Project.testData.length }}
              </b-form-text>
            </b-form-group> -->

            <!--
            <b-form-group id="classes"
                          class="mb-4"
                          label="Predetermined classes"
                          label-for="classes"
                          required>
              <b-form-file multiple
                           class="text-truncate"
                           v-model="Project.classes"
                           aria-describedby="classesCaption"
                           placeholder="Upload sample files"/>
              <b-form-text id="classesCaption">
                Selected files: {{ Project.classes.length }}
              </b-form-text>
            </b-form-group>
            -->

            <b-form-group id="expiryDateGroup"
                          class="mb-4"
                          label="Expiry date (optional)"
                          label-for="expiryDateGroup">
              <b-form-input id="expiryDate"
                            type="date"
                            aria-describedby="expiryCaption"
                            v-model="Project.expiryDate">
              </b-form-input>
              <b-form-text id="expiryCaption">
                Leave empty for unlimited duration
              </b-form-text>
            </b-form-group>

            <b-row>
              <b-col md="6">
                <b-form-group id="incentiveGroup"
                              class="mb-4"
                              label="Incentive per task"
                              label-for="incentiveGroup"
                              required>
                  <b-input-group prepend="$">
                    <b-form-input id="incentive"
                                  type="number"
                                  required
                                  :value="Project.incentive"
                                  min="0.005"
                                  step="0.005"
                                  required
                                  @change="validateIncentive"
                                  v-model="Project.incentive">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group id="AttemptsGroup"
                              class="mb-4"
                              label="Attempts limit"
                              label-for="AttemptsGroup"
                              required>
                  <b-form-input id="AttemptsLimit"
                                type="number"
                                required
                                :value="Project.attemptsLimit"
                                min="0"
                                step="1000"
                                v-model="Project.attemptsLimit"
                                aria-describedby="attemptsCaption"
                                placeholder="Empty for unlimited">
                  </b-form-input>
                  <b-form-text id="attemptsCaption">
                    0 = unlimited
                  </b-form-text>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group id="estimateGroup"
                          class="mb-4"
                          label="Estimated cost"
                          label-for="estimateGroup">
              <span v-if="Project.incentive * Project.attemptsLimit > 0">{{ Project.incentive }} × {{ Project.attemptsLimit }} = ${{ Project.incentive * Project.attemptsLimit }} </span>
              <span v-else>
                <i>Unable to calculate estimated cost</i>
              </span>
            </b-form-group>

            <b-button class="mt-1 mr-3" type="submit" variant="primary">Create project</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
    <b-modal centered size="sm" id="alertSubmit" ref="alertSubmit" title="Could not create project">
      <b-container>
        <b-row>
          Please make sure that you have entered all required data.
        </b-row>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <b-btn type="submit" class="float-right ml-3" variant="primary" @click="$refs.alertSubmit.hide()">
         Ok
        </b-btn>
      </div>
    </b-modal>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

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
  asyncData ({ params, error }) {
    // let { data } = await axios.get('/api/users')
    // return { users: data }
    return axios.get('/api/projects/')
      .then((res) => {
        return { project: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Project not found' })
      })
  },
  data () {
    return {
      Project: {
        title: '',
        titleState: null,
        titleErrorMsg: null,
        description: '',
        descriptionState: null,
        descriptionErrorMsg: null,
        owner: '',
        testData: '',
        typeSelected: 'modelling',
        typeOptions: [
          { text: 'Modelling', value: 'modelling' },
          { text: 'Prediction', value: 'prediction' }
        ],
        classes: [
          {
            class: '',
            index: 0,
            trainingData: '',
            testData: ''
          }
        ],
        expiryDate: null,
        incentive: 0.02,
        attemptsLimit: 0
      },
      classCount: 1,
      show: true,
      btnShow: false,
      btnDisableRemove: false
    }
  },
  methods: {
    validateIncentive () {
      if (isNaN(this.Project.incentive) || this.Project.incentive <= 0.05) {
        console.log('error')
      }
    },
    addClass () {
      this.classCount++
      this.btnDisableRemove = false
      this.Project.classes.push({
        class: '',
        index: this.classCount,
        trainingData: ''
      })
      console.log('class = ' + this.classCount)
    },
    removeClass (index) {
      if (this.classCount > 1) {
        this.classCount--
        this.Project.classes.splice(index, 1)
      } else {
        this.btnDisableRemove = true
      }
      console.log('class = ' + this.classCount)
    },
    async newProject (evt) {
      if (this.Project.title.length <= 0 || this.Project.title.description <= 0 || (this.Project.classes[0].class === '' && this.Project.typeSelected === 'modelling')) {
        this.$refs.alertSubmit.show()
      } else {
        console.log(this.Project)
        axios.get('/api/projects/')

        let formData = new FormData()
        formData.append('title', this.Project.title)
        formData.append('description', this.Project.description)
        formData.append('owner', this.$store.state.authUser.user._id)
        formData.append('ownerName', this.$store.state.authUser.user.name)
        formData.append('type', this.Project.typeSelected)
        formData.append('incentive', this.Project.incentive)
        formData.append('expense', 0)
        formData.append('attempts', 0)
        formData.append('attemptsLimit', this.Project.attemptsLimit)
        formData.append('contributor', 0)
        formData.append('estimatedCost', this.Project.incentive * this.Project.attemptsLimit)
        // formData.append('creationDate', now) // Default value in server
        if (this.Project.expiryDate) formData.append('expiryDate', this.Project.expiryDate)
        // formData.append('modelDate', null)
        // formData.append('modelQuality', null)
        formData.append('status', 'Ongoing')

        // For each class
        for (var ii = 0; ii < this.Project.classes.length; ii++) {
          formData.append('classes', this.Project.classes[ii].class)

          // For each training data in every class
          console.log('training')
          if (this.Project.classes[ii].trainingData) {
            for (var jj = 0; jj < this.Project.classes[ii].trainingData.length; jj++) {
              formData.append('tr-' + ii, this.Project.classes[ii].trainingData[jj])
            }
          }

          // For each test data in every class
          if (this.Project.classes[ii].testData) {
            console.log('testing')
            for (var kk = 0; kk < this.Project.classes[ii].testData.length; kk++) {
              formData.append('te', this.Project.classes[ii].testData[kk])
            }
          }
        }

        console.log('Project data = ', this.Project)
        console.log('Form data = ', formData)

        axios.post(
          '/api/projects/',
          formData,
          { headers: { 'content-type': 'multipart/form-data; boundary=X' } }
        ).then((response) => {
          console.log(this.Project.testData)
          this.$nuxt.$router.replace({ path: 'dashboard' })
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  },
  computed: {
    titleState () {
      if (this.Project.titleErrorMsg) {
        return false
      } else {
        return null
      }
    },
    descriptionState () {
      if (this.Project.descriptionErrorMsg) {
        return false
      } else {
        return null
      }
    }
  },
  head () {
    return {
      title: 'Swarm'
    }
  },
  components: {
    // DatasetModal
  }
}
</script>

<style lang="scss" scoped>
  .secondary-cta-link {
    color: $gray-600;
    & a {
      color: $gray-600;
      text-decoration: underline;
    }
  }
  .offset-min {
    position: absolute;
    left: -1.5rem;
    top: 0.5rem;
    font-size: 2rem;
  }
</style>
