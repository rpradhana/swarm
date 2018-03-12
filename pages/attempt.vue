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
        <b-col sm="12" md="8" order-md="1" order-sm="2">
          <b-row>
            <b-col sm="12" md="6">
              <b-card class="shadow mb-5"
                      :img-src="task.a"
                      img-alt="A"
                      img-top>
                <div class="text-center">
                  A
                </div>
              </b-card>
            </b-col>
            <b-col sm="12" md="6">
              <b-card class="shadow mb-5"
                      :img-src="task.b"
                      img-alt="B"
                      img-top>
                <div class="text-center">
                  B
                </div>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h5 class="mb-3">Answer</h5>
              <div class="mb-5">
                <b-form-group>
                  <b-form-radio-group id="answerType">
                    <b-form-radio class="mb-3">
                      <b-form inline>
                        <div>A has</div>
                        <b-form-input v-model="feature"
                                      class="ml-2 mr-2"
                                      type="text"
                                      placeholder="e.g. White stripes" />
                        <div>while B does not.</div>
                      </b-form>
                    </b-form-radio>
                    <b-form-radio>
                      <b-form inline>
                        <div>A's</div>
                        <b-form-input v-model="feature"
                                      class="ml-2 mr-2 mb-2"
                                      type="text"
                                      placeholder="e.g. Color" />
                        <div>is</div>
                        <b-form-input v-model="feature"
                                      class="ml-2 mr-2 mb-2"
                                      type="text"
                                      placeholder="e.g. White" />
                        <div>while B's is</div>
                        <b-form-input v-model="feature"
                                      class="ml-2 mr-2 mb-2"
                                      type="text"
                                      placeholder="e.g. Black" />
                      </b-form>
                    </b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </div>
              <b-form @submit="onSubmit" v-if="show">
                <b-button class="mr-3" type="submit" variant="primary" size="lg">
                  Submit
                </b-button>
                <b-button class="mr-3 skip" type="submit" variant="link" size="md">
                  Skip question
                </b-button>
              </b-form>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" md="4" order-md="2" order-sm="1">
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
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
// import axios from '~/plugins/axios'

export default {
  layout: 'owner',
  async asyncData () {
    // let { data } = await axios.get('/api/users')
    // return { users: data }
  },
  data () {
    return {
      show: true,
      feature: '',
      session: {
        title: 'Classify the species of birds of paradise',
        taskDone: 150,
        timeSpent: 15,
        earnings: 300
      },
      task: {
        a: 'https://picsum.photos/368/250/?photo=12',
        b: 'https://picsum.photos/368/250/?photo=13'
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
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
