<template>
  <footer class="footer">
    <b-container>
      <b-row align-h="between">
        <div>
<!--           <b-button variant="link" class="footer-link">
            About
          </b-button> -->
          <b-button variant="link" class="footer-link" href="https://github.com/rpradhana/swarm">
            Github
          </b-button>
        </div>
        <div>
          <b-button variant="link" class="footer-copyright">
            Copyright © 2018 Raymond Aditya Pradhana
          </b-button>
        </div>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .footer {
    background: $gray-900;
    padding-top: $spacer;
    padding-bottom: $spacer;
  }
  .footer-link {
    color: $gray-600;
    text-decoration: none;
    margin-right: $spacer;

    &:hover {
      color: $gray-500;
    }

  }
  .footer-copyright {
    color: $gray-600;
    text-decoration: none;

    &:hover {
      cursor: default;
    }
  }
</style>