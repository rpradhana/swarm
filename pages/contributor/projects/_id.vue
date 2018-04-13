<template>
  <section class="v-container">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12" md="4" offset-md="2">
          <!-- project.file[0].path.substring(6) -->
          <b-card class="shadow mb-5"
                  :img-src="taskA"
                  img-alt="A"
                  img-top>
            <div class="text-center">
              A
            </div>
          </b-card>
        </b-col>
        <b-col sm="12" md="4">
          <b-card class="shadow mb-5"
                  :img-src="taskB"
                  img-alt="B"
                  img-top>
            <div class="text-center">
              B
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col sm="12" md="8">
          <b-card no-body class="mb-5 shadow">
            <b-tabs no-fade card v-model="currentStep">
              <b-form @submit.prevent="getAttempt" v-if="show">
                <b-tab ref="step1" title="Step 1" active>
                  <h5 class="title mb-3">
                    Find one difference between A and B
                  </h5>
                  <b-form-group description="Please enter a single feature."
                                class="mb-4">
                    <b-form-input id="featureInput"
                                  size="lg"
                                  autofocus
                                  type="text"
                                  v-model="feature"
                                  @input="step1to2"
                                  @keyup.enter="proceed"
                                  required
                                  placeholder="e.g. pattern, color, size">
                    </b-form-input>
                  </b-form-group>
                  <div class="justify-content-end d-flex">
<!--                     <b-button variant="light" size="lg">
                      No difference
                    </b-button> -->
                    <b-button class="ml-3"
                              :variant="canProceed ? 'primary' : 'disabled'"
                              size="lg"
                              v-on:click="proceed">
                      Next
                    </b-button>
                  </div>
                </b-tab>

                <b-tab ref="step2" title="Step 2" :disabled="canProceed === 0">
                  <h5 class="title mb-3">
                    Which one has the "{{ feature }}"?
                  </h5>
                  <b-form-group>
                    <b-form-radio-group v-model="selected"
                                        buttons
                                        button-variant="outline-primary"
                                        size="lg"
                                        name="whichFeature">
                      <b-form-radio value="a" v-on:change="resetFeature">A</b-form-radio>
                      <b-form-radio value="b" v-on:change="resetFeature">B</b-form-radio>
                      <b-form-radio value="c" v-on:change="resetFeature">Enter custom values</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                  <template v-if="selected === 'a'">
                    <div class="font-italic">A has {{ feature }} while B does not.</div>
                  </template>
                  <template v-if="selected === 'b'">
                    <div class="font-italic">B has {{ feature }} while A does not.</div>
                  </template>
                  <template v-if="selected === 'c'">
                    <div class="mb-3 font-italic">A's {{ feature }} = <template v-if="featureA !== ''">{{ featureA }}</template><template v-else>_</template> while B's {{ feature }} = <template v-if="featureA !== ''">{{ featureB }}</template><template v-else>_</template>. </div>
                    <b-form-group horizontal
                                  :label-cols="1"
                                  label="A"
                                  label-size="lg"
                                  label-class="text-center"
                                  label-for="featureA">
                      <b-form-input id="featureA"
                                    size="lg"
                                    autofocus
                                    type="text"
                                    required
                                    v-model="featureA"
                                    placeholder="">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group horizontal
                                  :label-cols="1"
                                  label="B"
                                  label-size="lg"
                                  label-class="text-center"
                                  label-for="featureB">
                      <b-form-input id="featureB"
                                    size="lg"
                                    autofocus
                                    type="text"
                                    required
                                    v-model="featureB"
                                    placeholder="">
                      </b-form-input>
                    </b-form-group>
                  </template>
                  <div class="justify-content-end d-flex">
                    <b-button @click="back" variant="light" size="lg">
                      Back
                    </b-button>
                    <b-button type="submit" class="ml-3" variant="primary" size="lg" @click.prevent="postAttempt">
                      Submit
                    </b-button>
                  </div>
                </b-tab>
              </b-form>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>

      <b-row align-h="center">
        <b-col sm="12" md="8" class="text-center">
          <b-button class="skip text-uppercase" variant="link" size="sm" @click="skip">
            Skip this question
          </b-button>
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
    } else if (store.state.authUser.user.type !== 'contributor') {
      return redirect('/')
    }
  },
  async asyncData ({ store }) {
    let { data } = await axios.get('/api/attempt/' + store.state.attempt.project._id)
    // Change the image
    data['taskA'] = data.a.path.substring(6)
    data['taskB'] = data.b.path.substring(6)
    data['c1'] = data.c1
    data['c2'] = data.c2
    console.log('Initial data', data)
    return data
  },
  data () {
    return {
      flags: [],
      show: true,
      feature: '',
      featureA: '',
      featureB: '',
      pathA: '/uploads/tr-0-5ace32166c2ddb29c3a424fe-1523463558779.jpg',
      pathB: '/uploads/tr-0-5ace32166c2ddb29c3a424fe-1523463558779.jpg',
      currentStep: 0,
      canProceed: 0,
      session: {
        title: 'Classify the species of birds of paradise',
        taskDone: 150,
        timeSpent: 15,
        earnings: 300
      },
      selected: 'a',
      options: [
        { text: 'A', value: 'a' },
        { text: 'B', value: 'b' },
        { text: 'Enter custom values', value: 'c' }
      ]
    }
  },
  methods: {
    onSubmit (evt) {
    },
    reset () {
      this.selected = 'a'
      this.feature = ''
      this.featureA = ''
      this.featureB = ''
      this.currentStep = 0
      this.canProceed = 0
    },
    resetFeature () {
      switch (this.selected) {
        case ('a'): {
          this.featureA = true
          this.featureB = false
          break
        }
        case ('b'): {
          this.featureA = false
          this.featureB = true
          break
        }
        case ('c'): {
          break
        }
      }

      this.featureA = ''
      this.featureB = ''
    },
    back () {
      this.currentStep = 0
      this.reset()
      console.log('step = ', this.currentStep)
    },
    step1to2 () {
      if (this.feature.length > 0) {
        this.canProceed = 1
      } else if (this.feature.length === 0) {
        this.canProceed = 0
      }
    },
    proceed () {
      this.currentStep = 1
      console.log('step = ', this.currentStep)
    },
    async getAttempt () {
      if (this.currentStep >= 0) {
        axios.get('/api/attempt/' + this.$store.state.attempt.project._id)
          .then((res) => {
            console.log(res.data)

            // Change the image
            this.taskA = res.data.a.path.substring(6)
            this.taskB = res.data.b.path.substring(6)
          })
      } else {
        this.proceed()
      }
    },
    async skip () {
      this.getAttempt()
    },
    async postAttempt () {
      let a, b
      switch (this.selected) {
        case ('a'): {
          a = true
          b = false
          break
        }
        case ('b'): {
          a = false
          b = true
          break
        }
        case ('c'): {
          a = this.featureA
          b = this.featureB
          break
        }
      }
      let newAttempt = {
        mode: this.selected,
        projectId: this.$store.state.attempt.project._id,
        feature: this.feature,
        a: a,
        b: b,
        c1: this.c1,
        c2: this.c2,
        userId: this.$store.state.authUser.user._id
      }
      console.log('attempt = ', newAttempt)
      axios.post('/api/postAttempt/', newAttempt)
        .then((res) => {
          console.log(res.data)
        })
        .then(() => {
          this.back()
        })
        .then(() => {
          this.getAttempt()
        })
        .catch((error) => {
          console.log(error)
        })
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
  .skip {
    color: $tertiary;
    text-decoration: none;
  }
</style>
