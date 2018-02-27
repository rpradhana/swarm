<template>
  <section class="v-container">
    <Hero/>
    <CTA/>
    <Howto/>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import Hero from '~/components/Hero.vue'
import CTA from '~/components/CTA.vue'
import Howto from '~/components/Howto.vue'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/users')
    return { users: data }
  },
  head () {
    return {
      title: 'Swarm'
    }
  },
  components: {
    Hero,
    CTA,
    Howto
  }
}
</script>

<style scoped>
</style>
