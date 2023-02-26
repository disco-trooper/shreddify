<template class="test">
  <div id="app">
    <Navbar />
    <router-view class="router mt-5"></router-view>
    <footer class="footer-basic has-text-centered">
      <p>
        <strong>Shreddify</strong> by
        <a href="https://github.com/disco-trooper">disco_trooper</a>.
      </p>
    </footer>
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
.footer-basic {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 60px; /* Height of the footer */
}
</style>
