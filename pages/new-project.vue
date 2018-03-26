<template>
  <section class="v-container u-flex-center">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12" md="6" offset-md="3">
          <h3 class="title mb-5">
            <nuxt-link to="my-projects"><i class="material-icons offset-min secondary-cta-link">chevron_left</i></nuxt-link>
            Create new project
          </h3>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="titleGroup"
                          class="mb-4"
                          label="Title"
                          label-for="titleGroup">
              <b-form-input id="title"
                            type="text"
                            required
                            v-model="Project.title"
                            placeholder="Enter project title">
              </b-form-input>
            </b-form-group>
            <b-form-group id="descriptionGroup"
                          class="mb-4"
                          label="Description"
                          label-for="descriptionGroup">
              <b-form-input id="description"
                            type="text"
                            required
                            v-model="Project.description"
                            placeholder="Enter project description">
              </b-form-input>
            </b-form-group>
            <b-form-group id="datasetGroup"
                          class="mb-4"
                          label="Dataset"
                          label-for="datasetGroup"
                          required>
              <b-form-file v-model="Project.file" placeholder="Upload your dataset"></b-form-file>
              <div class="mt-3 small">Selected file: {{ Project.file }}</div>
            </b-form-group>
            <b-form-group id="typeGroup"
                          class="mb-4"
                          label="Type"
                          label-for="typeGroup"
                          required>
              <b-form-radio-group v-model="Project.typeSelected"
                                  :options="Project.typeOptions"
                                  stacked
                                  name="radiosStacked">
              </b-form-radio-group>
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
                                  type="text"
                                  required
                                  @change="validateIncentive"
                                  v-model="Project.incentive"
                                  placeholder="Min. 0.005">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group id="contributorGroup"
                              class="mb-4"
                              label="Contributor limit"
                              label-for="contributorGroup"
                              required>
                  <b-form-input id="contributorLimit"
                                type="text"
                                v-model="Project.contributorLimit"
                                placeholder="Empty for unlimited">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group id="classesGroup"
                          class="mb-4"
                          label="Predetermined classes"
                          label-for="classesGroup">
              <b-button variant="light">Set classes</b-button>
            </b-form-group>
            <b-form-group id="esstimateGroup"
                          class="mb-4"
                          label="Estimated cost"
                          label-for="estimateGroup">
              <span>{{ Project.incentive }} × {{ Project.contributorLimit }} = ${{ Project.incentive * Project.contributorLimit }} </span>
            </b-form-group>

            <b-button class="mt-1 mr-3" type="submit" variant="primary">Create project</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  layout: 'owner',
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
        file: '',
        typeSelected: 'modelling',
        typeOptions: [
          { text: 'Modelling', value: 'modelling' },
          { text: 'Prediction', value: 'prediction' }
        ],
        title: '',
        description: '',
        classes: '',
        incentive: 0.005,
        contributorLimit: 0
      },
      show: true
    }
  },
  methods: {
    validateIncentive () {
      if (isNaN(this.Project.incentive) || this.Project.incentive <= 0.05) {
        console.log('error')
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      console.log('SUBMIT')

      let newProject = {
        title: this.Project.title,
        description: this.Project.description,
        file: this.Project.file,
        typeSelected: this.Project.typeSelected,
        classes: this.Project.classes,
        incentive: this.Project.incentive,
        estimatedCost: this.Project.incentive * this.Project.contributorLimit,
        contributorLimit: this.Project.contributorLimit
      }

      axios.post('/api/projects/', newProject)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
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
