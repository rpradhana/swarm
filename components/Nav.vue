<template>
  <nav class="nav sticky-top shadow">
    <b-container>
      <b-col>
        <b-row align-h="between">
          <div class="nav-brand">
            <nuxt-link to="/"><img class="nav-logo" src="img/swarm-logo.svg"></nuxt-link>
          </div>
          <div class="nav-menu">
            <b-button variant="link" class="nav-link" to="welcome?a=sign-in">
              Sign In
            </b-button>
            <b-button variant="primary" to="welcome?a=register">
              Register
            </b-button>
          </div>
        </b-row>
      </b-col>
    </b-container>
  </nav>
</template>

<script>
export default {

  name: 'Nav',
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.errorMessage = e.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
  }
  .nav-link {
    color: $black;
    text-decoration: none;
    margin-right: $spacer;

    &:hover {
      color: $primary;
    }
  }

  @include media-breakpoint-down(xs) {
    .nav-brand {
      width: 35px;
      height: 35px;
      overflow: hidden;
    }
  }
</style>