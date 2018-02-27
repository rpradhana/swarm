<template>
  <div>
    <Nav/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '~/components/Footer.vue'
import Nav from '~/components/Nav.vue'

export default {
  components: {
    Footer,
    Nav
  }
}
</script>

<style>
</style>
