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

<style>
</style>
