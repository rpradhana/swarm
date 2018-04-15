<template>
  <section class="v-container">
  </section>
</template>

<script>

export default {
  layout: 'default',
  fetch ({ store, redirect }) {
    if (store.state.authUser.user.type === 'owner') {
      return redirect('/owner/dashboard')
    } else if (store.state.authUser.user.type === 'contributor') {
      return redirect('/contributor/dashboard')
    } else {
      return redirect('/welcome?a=sign-in')
    }
  },
  head () {
    return {
      title: 'Swarm'
    }
  }
}
</script>