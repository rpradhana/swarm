<template>
  <section class="v-container">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col col="12">
          <h4 class="title mb-5">
            My projects
          </h4>
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
