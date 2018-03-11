<template>
  <section class="v-container">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12">
          <h4 class="title mb-5">
            My projects
          </h4>
          <b-row class="project-grid-container">
            <ProjectGridItem v-for="project in projects"
                             :key="project.id"
                             :id                 = "project.id"
                             :title              = "project.title"
                             :type               = "project.type"
                             :contributors       = "project.contributors"
                             :contributors-limit = "project.contributorsLimit"
                             :results            = "project.results"
                             :results-limit      = "project.resultsLimit"
                             :expense            = "project.expense"
                             :latest             = "project.latest"
                             :quality            = "project.quality"
                             :status             = "project.status"/>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
// import axios from '~/plugins/axios'
import ProjectGridItem from '~/components/ProjectGridItem.vue'

export default {
  layout: 'owner',
  async asyncData () {
    // let { data } = await axios.get('/api/users')
    // return { users: data }
  },
  data () {
    return {
      projects: [
        {
          id: '00000001',
          title: 'Classify the species of birds of paradise',
          type: 'Modelling',
          contributors: 10000,
          contributorsLimit: 15000,
          expense: 131.80,
          latest: '1/03/2017',
          quality: 'Good',
          status: 'Ongoing'
        },
        {
          id: '00000002',
          title: 'Identifying the species of birds',
          type: 'Prediction',
          contributors: 14,
          contributorsLimit: 1000,
          expense: 2.80,
          results: 28,
          resultsLimit: 50000,
          status: 'Ongoing'
        },
        {
          id: '00000003',
          title: 'Identify features of sad and happy expressions',
          type: 'Prediction',
          contributors: 1850,
          contributorsLimit: 2000,
          expense: 185,
          latest: '3/12/2016',
          results: 80000,
          resultsLimit: 80000,
          status: 'Ongoing'
        },
        {
          id: '00000004',
          title: 'Classify the species of birds of paradise',
          type: 'Modelling',
          contributors: 10000,
          contributorsLimit: 15000,
          expense: 131.80,
          latest: '1/03/2017',
          quality: 'Good',
          status: 'Ongoing'
        },
        {
          id: '00000005',
          title: 'Classify the species of birds of paradise',
          type: 'Modelling',
          contributors: 10000,
          contributorsLimit: 15000,
          expense: 131.80,
          latest: '1/03/2017',
          quality: 'Good',
          status: 'Ongoing'
        }
      ]
    }
  },
  head () {
    return {
      title: 'Swarm'
    }
  },
  components: {
    ProjectGridItem
  }
}
</script>

<style lang="scss" scoped>
</style>
