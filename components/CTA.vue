<template>
  <section class="cta">
    <b-container>
      <b-row>
        <b-col sm="12" md="8" offset-md="2">
          <div class="u-flex-center cta-content text-center pt-5 pb-5">
            <h3 class="title">
              Human requires less data to draw conclusions, filling in the gap where machines fail.
            </h3>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {

  name: 'CTA',

  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .cta {
    background: $primary;
    color: $white;
  }
  .cta-content * {
    line-height: 1.5;
  }
</style>