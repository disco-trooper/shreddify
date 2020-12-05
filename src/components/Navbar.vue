<template>
  <b-navbar :shadow="false" type="is-primary">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/logo.png" alt="" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-dropdown label="Body" :collapsible="true">
        <b-navbar-item
          class="has-text-weight-bold is-size-6"
          href=""
          tag="router-link"
          :to="{ path: '/bmi-calculator' }"
        >
          BMI Calculator
        </b-navbar-item>
        <b-navbar-item
          class="has-text-weight-bold is-size-6"
          href=""
          tag="router-link"
          :to="{ path: '/ffmi-calculator' }"
        >
          FFMI Calculator
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Strength" :collapsible="true">
        <b-navbar-item
          class="has-text-weight-bold is-size-6"
          href=""
          tag="router-link"
          :to="{ path: '/1rm-calculator' }"
        >
          1RM Calculator
        </b-navbar-item>
        <b-navbar-item
          class="has-text-weight-bold is-size-6"
          href=""
          tag="router-link"
          :to="{ path: '/wilks-calculator' }"
        >
          Wilks Calculator
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Nutrition" :collapsible="true">
        <b-navbar-item
          class="has-text-weight-bold is-size-6"
          href=""
          tag="router-link"
          :to="{ path: '/bmr-calculator' }"
        >
          BMR Calculator
        </b-navbar-item>
        <b-navbar-item
          class="has-text-weight-bold is-size-6"
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
