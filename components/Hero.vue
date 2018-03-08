<template>
  <section class="hero">
    <b-container>
      <b-row>
        <b-col sm="12" md="10" offset-md="1">
          <div class="u-flex-center hero-content text-center pt-5 pb-5">
            <h1 class="title mb-4">Human-in-the-loop framework for data classification</h1>
            <h5 class="mb-5">
              Utilize the power of crowd to prototype a classification model or improve the accuracy of an existing machine learning framework.
            </h5>
            <b-button variant="primary" size="lg">
              Get Started
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .hero {
    background-image: url('/assets/img/hero.jpg');
    background-position: center top;
    background-size: cover;
  }
  .hero-content {
    min-height: 80vh;
  }
  .hero-content * {
    line-height: 1.5;
  }
</style>