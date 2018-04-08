<template>
  <section class="v-container">
    <b-container class="pb-7 pt-5">
      <b-row>
        <b-col sm="12">
          <h4 class="title mb-5">
            My projects
          </h4>
        </b-col>
      </b-row>
      <b-row class="project-grid-container">
        <ProjectGridItem v-for = "project in projects"
                         :key                = "project._id"
                         :id                 = "project._id"
                         :title              = "project.title"
                         :type               = "project.type"
                         :contributor        = "project.contributor"
                         :contributor-limit  = "project.contributorLimit"
                         :attempts           = "project.attempts"
                         :attempts-limit     = "project.attemptsLimit"
                         :expense            = "project.incentive*project.attempts"
                         :model-date         = "project.modelDate"
                         :model-quality      = "project.modelQuality"
                         :status             = "project.status"/>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import ProjectGridItem from '~/components/ProjectGridItem.vue'

export default {
  layout: 'owner',
  fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      // return redirect('/welcome?a=sign-in')
    } else if (store.state.authUser.user.type !== 'owner') {
      // return redirect('/')
    }
  },
  async asyncData () {
    let { data } = await axios.get('/api/projects')
    console.log(data)
    return data
  },
  data () {
    return {
    }
  },
  computed: {
    hasLoaded: () => {
      // alert('has loaded')
      if (this.hasOwnProperty('projects') && this.projects != null) {
        alert()
        return true
      } else {
        return false
      }
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
