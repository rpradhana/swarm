<template>
  <nav class="nav">
    <b-container>
      <b-col>
        <b-row align-h="between">
          <div class="nav-brand">
            <a href="#"><img src="swarm-logo.svg"></a>
          </div>
          <div class="nav-menu">
            <b-button variant="link" class="nav-link">
              Sign In
            </b-button>
            <b-button variant="primary">
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
    position: fixed;
    width: 100%;
    background: $white;
    z-index: 100000;
    -webkit-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
    -moz-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
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
</style>