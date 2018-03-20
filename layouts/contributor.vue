<template>
  <div>
    <NavContributor/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '~/components/Footer.vue'
import NavContributor from '~/components/NavContributor.vue'

export default {
  components: {
    Footer,
    NavContributor
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
</style>
