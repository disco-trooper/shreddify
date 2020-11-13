<template class="test">
  <div id="app">
    <Navbar />
    <h3 class="ml-5 mt-3 title is-4">The toolkit to get shredded</h3>
    <router-view class="router"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  components: { Navbar },
};
</script>

<style lang="scss">
html {
  background-color: #dfdfdf !important;
}
</style>
