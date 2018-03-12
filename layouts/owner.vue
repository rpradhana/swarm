<template>
  <div>
    <NavOwner/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '~/components/Footer.vue'
import NavOwner from '~/components/NavOwner.vue'

export default {
  components: {
    Footer,
    NavOwner
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
