<template>
  <b-col sm="12" md="6" lg="4" class="mb-5">
    <b-card :id="id"
            v-if="id !== false"
            class="project-grid-item shadow">
      <div class="mb-4">
        <p class="card-title mb-3">{{ title }}</p>
        <div class="card-text">
          <div>
            <strong>Type: </strong>
            {{ type }}
          </div>
          <div>
            <strong>Contributors: </strong>
            {{ format('comma', contributor) }}
          </div>
          <div>
            <strong>Expense: </strong>
            {{ format('currency', format('comma', expense)) }}
          </div>
          <div v-if="modelDate && modelDate !== 'null'">
            <strong>Latest model: </strong>
            {{ modelDate }}
          </div>
          <div v-if="modelQuality && modelQuality !== 'null'">
            <strong>Model quality: </strong>
            {{ modelQuality }}
          </div>
          <div>
            <strong>Results: </strong>
            {{ format('comma', attempts) }}
            <span v-if="attemptsLimit > 0">/ {{ format('comma', attemptsLimit) }}</span>
          </div>
        </div>
      </div>
      <div class="card-actions">
        <b-button variant="primary" class="mr-3" @click="openProject">
          Manage
        </b-button>
        <b-button v-if="status === 'Ongoing'" variant="secondary" class="mr-3" @click="startPause">
          {{ status }}
        </b-button>
        <b-button v-else-if="status === 'Paused'" variant="tertiary" class="mr-3" @click="startPause">
          {{ status }}
        </b-button>
        <b-button v-else-if="status === 'Finished'" variant="disabled" class="mr-3">
          {{ status }}
        </b-button>
      </div>
    </b-card>
  </b-col>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  fetch ({ store, redirect }) {
  },
  async asyncData () {
    // let { data } = await axios.get('/api/users')
    // return { users: data }
  },
  data: {
  },
  props: {
    id: {
      default: null
    },
    title: {
      default: 'Project Title'
    },
    type: {
      default: 'Modelling'
    },
    contributor: {
      default: 0
    },
    expense: {
      default: 0
    },
    modelDate: {
      default: null
    },
    modelQuality: {
      default: null
    },
    attempts: {
      default: 0
    },
    attemptsLimit: {
      default: 0
    },
    status: {
      default: 'Ongoing'
    }
  },
  methods: {

    async startPause () {
      switch (this.status) {
        case 'Ongoing': {
          this.status = 'Paused'

          let statusUpdate = {
            projectId: this.id,
            status: this.status
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
          this.status = 'Ongoing'

          let statusUpdate = {
            projectId: this.id,
            status: this.status
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
    },
    async openProject () {
      try {
        await this.$store.dispatch('project', {
          id: this.id
        })
        console.log(this.$store.state.project.project._id)
        if (this.$store.state.project) {
          this.$nuxt.$router.replace({ path: '/owner/modelling/' + this.id })
        }
      } catch (e) {
      }
    },
    format (type, input) {
      switch (type) {
        case 'comma': return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        case 'currency': return ('$' + input)
      }
    }
  },
  head () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    height: 100%;
    & .card-title {
      font-family: inherit;
      font-size: $h5-font-size;
      font-weight: $font-weight-medium;
      line-height: $line-height-lg;
    }
    & .card-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
</style>
