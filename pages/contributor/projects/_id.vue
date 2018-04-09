<template>
  <section class="v-container">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12" md="6">
          <b-card class="shadow mb-5"
                  :img-src="project.file[0].path.substring(6)"
                  img-alt="A"
                  img-top>
            <div class="text-center">
              A
            </div>
          </b-card>
        </b-col>
        <b-col sm="12" md="6">
          <b-card class="shadow mb-5"
                  :img-src="project.file[1].path.substring(6)"
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
              <b-form @submit="onSubmit" v-if="show">
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
                                  required
                                  placeholder="e.g. pattern, color, size">
                    </b-form-input>
                  </b-form-group>
                  <div class="justify-content-end d-flex">
                    <b-button variant="light" size="lg">
                      No difference
                    </b-button>
                    <b-button class="ml-3"
                              variant="primary"
                              size="lg"
                              v-on:click="step1to2">
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
                    <b-button v-on:click="back" variant="light" size="lg">
                      Back
                    </b-button>
                    <b-button type="submit" class="ml-3" variant="primary" size="lg">
                      Submit
                    </b-button>
                  </div>
                </b-tab>

<!--                 <b-tab title="Step 3">
                  <h5 class="title mb-3">
                    A's {{ feature }} is _ while B's is _
                  </h5>
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
                                  placeholder="e.g. pattern, color, size">
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
                                  placeholder="e.g. pattern, color, size">
                    </b-form-input>
                  </b-form-group>
                </b-tab> -->

              </b-form>
            </b-tabs>
          </b-card>
        </b-col>
<!--         <b-col sm="12" md="4">
          <b-card class="shadow mb-5">
            <div class="mb-3">
              <div>
                <strong>Session earnings: </strong>{{ session.earnings }}
              </div>
              <div>
                <strong>Task done: </strong>{{ session.taskDone }}
              </div>
              <div>
                <strong>Time spent: </strong>${{ session.timeSpent }}
              </div>
            </div>
            <b-button variant="light">
              End session
            </b-button>
          </b-card>
        </b-col> -->
      </b-row>

      <b-row align-h="center">
        <b-col sm="12" md="8" class="text-center">
          <b-button class="skip text-uppercase" variant="link" size="sm">
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
      // return redirect('/welcome?a=sign-in')
    } else if (store.state.authUser.user.type !== 'contributor') {
      // return redirect('/')
    }
  },
  async asyncData ({ store }) {
    let { data } = await axios.get('/api/project/' + store.state.attempt.project._id)
    // console.log(data)
    return data
  },
  data () {
    return {
      show: true,
      feature: '',
      featureA: '',
      featureB: '',
      currentStep: 0,
      canProceed: 1,
      session: {
        title: 'Classify the species of birds of paradise',
        taskDone: 150,
        timeSpent: 15,
        earnings: 300
      },
      task: {
        a: 'http://cdn.lightgalleries.net/4bd5ec0079abc/images/BOP-101211-297---Version-2-1.jpg',
        b: 'https://www.hbw.com/sites/default/files/styles/ibc_2k/public/ibc/p/Lesser_Bird_of_Paradise_06.jpg?itok=BAYcHgw0'
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
    onSubmit: function (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    resetFeature: function () {
      this.featureA = ''
      this.featureB = ''
    },
    back: function () {
    },
    step1to2: function () {
      if (this.feature.length > 0) {
        this.proceed()
      }
    },
    proceed: function () {
      this.currentStep += 1
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
