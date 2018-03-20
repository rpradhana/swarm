<template>
  <b-col sm="12" md="6" lg="4" class="mb-5">
    <b-card :id="id"
            v-if="id !== false"
            class="project-grid-item shadow">
      <div class="mb-4">
        <p class="card-title mb-3">{{ title }}</p>
        <div class="card-text">
          <div v-if="type">
            <strong>Type: </strong>
            {{ type }}
          </div>
          <div v-if="contributors">
            <strong>Contributors: </strong>
            {{ format('comma', contributors) }}
            <span v-if="contributorsLimit">/ {{ format('comma', contributorsLimit) }}</span>
          </div>
          <div v-if="expense">
            <strong>Expense: </strong>
            {{ format('currency', format('comma', expense)) }}
          </div>
          <div v-if="latest">
            <strong>Latest model: </strong>
            {{ latest }}
          </div>
          <div v-if="quality">
            <strong>Model quality: </strong>
            {{ quality }}
          </div>
          <div v-if="results">
            <strong>Results: </strong>
            {{ format('comma', results) }}
            <span v-if="resultsLimit">/ {{ format('comma', resultsLimit) }}</span>
          </div>
        </div>
      </div>
      <div class="card-actions">
        <b-button variant="primary" class="mr-3" to="model">
          Manage
        </b-button>
        <b-button variant="secondary" class="mr-3">
          {{ status }}
        </b-button>
      </div>
    </b-card>
  </b-col>
</template>

<script>
// import axios from '~/plugins/axios'

export default {
  async asyncData () {
    // let { data } = await axios.get('/api/users')
    // return { users: data }
  },
  props: {
    id: {
      default: false
    },
    title: {
      default: false
    },
    type: {
      default: false
    },
    contributors: {
      default: false
    },
    contributorsLimit: {
      default: false
    },
    expense: {
      default: false
    },
    latest: {
      default: false
    },
    quality: {
      default: false
    },
    results: {
      default: false
    },
    resultsLimit: {
      default: false
    },
    status: {
      default: false
    }
  },
  methods: {
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
