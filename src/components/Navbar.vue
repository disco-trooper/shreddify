<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h1 class="is-size-4">Shreddify</h1>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-dropdown label="Nutrition">
        <b-navbar-item
          href=""
          tag="router-link"
          :to="{ path: '/bmr-calculator' }"
        >
          BMR Calculator
        </b-navbar-item>
        <b-navbar-item
          href=""
          tag="router-link"
          :to="{ path: '/tdee-calculator' }"
        >
          TDEE Calculator
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script>
export default {};
</script>
