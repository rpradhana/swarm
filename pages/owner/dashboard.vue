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
      <b-row class="placeholder" v-if="projects.length <= 0">
        <b-col xs="12" s="8" offset-s="2" md="6" offset-md="3">
          <b-card class="new-card shadow text-center"
                  title="Create your first project">
            <b-button variant="primary"
                      size="lg"
                      to="/owner/new-project"
                      class="mt-4">
              New Project
            </b-button>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="project-grid-container">
        <ProjectGridItem v-for = "project in projects"
                         :key                = "project._id"
                         :id                 = "project._id"
                         :title              = "project.title"
                         :type               = "project.type"
                         :contributor        = "project.contributor"
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
      return redirect('/welcome?a=sign-in')
    } else if (store.state.authUser.user.type === 'contributor') {
      return redirect('/contributor/dashboard')
    } else {
    }
  },
  async asyncData ({ store }) {
    if (store.state.authUser) {
      let { data } = await axios.get('/api/projects/' + store.state.authUser.user._id)
      console.log(data)
      data.projects.some((project, index) => {
        if (project.modelDate) {
          project.modelDate = window.moment(project.modelDate).format('lll')
        }
        if (project.expiryDate) {
          project.expiryDate = window.moment(project.expiryDate).format('lll')
        }
        if (project.creationDate) {
          project.creationDate = window.moment(project.creationDate).format('lll')
        }
      })
      return data
    }
  },
  data () {
    return {
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
  .new-card {
    margin-top: calc( 50vh - 16rem );
    padding-top: $spacer * 3;
    padding-bottom: $spacer * 3;
  }
</style>
