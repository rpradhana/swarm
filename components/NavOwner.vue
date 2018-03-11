<template>
  <nav class="nav sticky-top shadow">
    <b-container>
      <b-col>
        <b-row align-h="between">
          <div class="nav-brand">
            <a href="#"><img src="img/swarm-logo.svg"></a>
          </div>
          <div class="nav-menu">
            <b-button variant="primary" class="mr-3">
              New project
            </b-button>
            ​<picture class="avatar">
              <img src="https://lorempixel.com/32/32/people" class="img-fluid img-thumbnail" alt="avatar">
            </picture>
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
  }
</style>