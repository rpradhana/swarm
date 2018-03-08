<template>
  <section class="howto">
    <b-container class="pt-7 pb-7">
      <b-row v-for="(step, index) in steps" :key="step">
        <b-col cols="2" md="1" offset-md="2">
          <div class="pt-3">
            <div class="number-circle">
              <h4 class="mb-0 title">{{ index + 1 }}</h4>
            </div>
          </div>
        </b-col>
        <b-col cols="10" md="7">
          <div class="howto-content pt-3 pb-3">
            <h3 class="title mb-3">
              {{ step.title }}
            </h3>
            <p>
              {{ step.description }}
            </p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {

  name: 'Howto',

  data () {
    return {
      steps: [
        {
          title: 'Owners create projects',
          description: 'Owners only need to provide the dataset and incentives for the contributors. The system and contributors will do the rest.'
        },
        {
          title: 'Contributors do simple tasks',
          description: 'Tasks are simplified as either find-the-difference or yes-no-question. The simpler they are, the more accurate the result will be.'
        },
        {
          title: 'Win-win solution',
          description: 'Owners will receive training model and classification result, while contributors will be rewarded for their work.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .howto {
  }
  .howto-content * {
    line-height: 1.5;
  }
  .number-circle {
    background: $primary;
    color: $white;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>