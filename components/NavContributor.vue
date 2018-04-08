<template>
  <nav class="nav sticky-top shadow">
    <b-container>
      <b-col>
        <b-row align-h="between">
          <div class="nav-brand">
            <nuxt-link to="dashboard"><img src="~assets/img/swarm-logo.svg"></nuxt-link>
            <div class="nav-menu ml-3">
              <b-button variant="link" class="mr-3 nav-link" to="dashboard">
                Dashboard
              </b-button>
              <b-button variant="link" class="mr-3 nav-link" to="projects">
                Projects
              </b-button>
            </div>
          </div>
          <div class="search">
            <b-form-input type="text"
                          placeholder="Search projects"/>
          </div>
          <div class="nav-menu">
            <b-button variant="link" class="ml-3 mr-5 nav-link">
              
            </b-button>
            <b-dropdown variant="link" right class="link-black">
              <template slot="button-content">
                ​<picture class="avatar">
                  <img src="https://placeimg.com/32/32/people" class="img-fluid img-thumbnail" alt="avatar">
                </picture>
              </template>
              <b-dropdown-item @click.prevent="">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout">Sign out</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-row>
      </b-col>
    </b-container>
  </nav>
</template>

<script>
export default {

  name: 'Nav',

  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .link-black {
    color: $black;
    &::after {
      color: $black;
      margin-left: $spacer * 0.5;
    }
    &:hover {
      color: $dark;
    }
  }
  .nav {
    padding-top: $spacer * 0.5;
    padding-bottom: $spacer * 0.5;
    // position: fixed;
    width: 100%;
    background: $white;
    z-index: 100;
  }
  .nav-brand {
    display: flex;
    align-items: center;
  }
  .nav-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .nav-link {
    color: $black;
    text-decoration: none;
    margin-right: $spacer;

    &:hover {
      color: $primary;
    }
  }
  .avatar img{
    border: none;
    border-radius: 50%;
    padding: 0;
    position: absolute;
    left: -10%;
    top: 50%;
    transform: translate(-50%, -50%)
  }
  .search {
    flex-grow: 1;
  }
</style>