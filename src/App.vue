<template>
  <div id="app">
    <Navbar />
    <h3 class="ml-5 title is-4">The toolkit to get shredded</h3>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  components: { Navbar },
};
</script>

<style lang="scss"></style>
