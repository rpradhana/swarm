<template>
  <section class="v-container">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12" md="8" order-md="1" order-sm="2">
          <b-row>
            <b-col sm="12" md="12">
              <b-card class="shadow mb-5"
                      :img-src="question.src"
                      img-alt="A"
                      img-top>
                <div class="text-center">
                  A
                </div>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h5 class="mb-3 font-weight-normal">Does it have <span class="font-weight-bold">{{ question.feature }}</span>?</h5>
              <b-form @submit="onSubmit" v-if="show">
                <b-button class="mr-3" type="submit" variant="primary" size="lg">
                  Yes
                </b-button>
                <b-button class="mr-3" type="submit" variant="danger" size="lg">
                  No
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
      session: {
        title: 'Classify the species of birds of paradise',
        taskDone: 150,
        timeSpent: 15,
        earnings: 300
      },
      question: {
        src: 'https://picsum.photos/368/250/?photo=12',
        feature: 'white stripes'
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
