<template>
  <nav class="nav">
    <b-container>
      <b-col>
        <b-row align-h="between">
          <div class="nav-brand">
            <a href="#"><img src="http://via.placeholder.com/160x35"></a>
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
  .nav-brand {
    display: flex;
    align-items: center;
  }
  .nav {
    padding-top: $spacer * 0.5;
    padding-bottom: $spacer * 0.5;
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