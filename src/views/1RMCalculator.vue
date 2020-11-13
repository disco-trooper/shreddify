<template>
  <div>
    <div class="box">
      <h1 class="has-text-centered title">
        <b-tooltip
          label="1RM is the maximum amount of weight that you can possibly lift for one repetition"
          position="is-bottom"
          :size="getTooltipSize"
          multilined
          dashed
          type="is-primary"
        >
          <span>1RM</span>
        </b-tooltip>
        Calculator
      </h1>
      <section>
        <!-- Units selected? -->
        <b-field label="Which units?">
          <b-radio v-model="units" name="units" native-value="metric">
            Metric
          </b-radio>
          <b-radio v-model="units" name="units" native-value="imperial">
            Imperial
          </b-radio>
        </b-field>

        <!-- Weight -->
        <b-field label="Weight Lifted" :type="{ 'is-danger': weight <= 0 }">
          <b-input
            class="weight"
            type="number"
            v-model="weight"
            min="1"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">{{
              units === 'metric' ? 'kg' : 'lbs'
            }}</span>
          </p>
        </b-field>

        <!-- Reps -->
        <b-field label="Weight Lifted" :type="{ 'is-danger': reps <= 0 }">
          <b-input
            class="reps"
            type="number"
            v-model="reps"
            min="1"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">reps</span>
          </p>
        </b-field>

        <!-- Result -->
        <div class="mt-4 is-size-5 has-text-centered has-text-weight-bold">
          Your
          <b-tooltip
            label="1RM is the maximum amount of weight that you can possibly lift for one repetition"
            position="is-top"
            :size="getTooltipSize"
            multilined
            dashed
            type="is-primary"
          >
            <span>1RM</span>
          </b-tooltip>
          is {{ get1RM }} {{ this.units === 'metric' ? 'kg' : 'lbs.' }}
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    units: 'metric',
    reps: 5,
    weight: 100,
  }),
  methods: {},
  computed: {
    get1RM() {
      return this.units === 'metric'
        ? Math.round(this.weight * (1 + 0.033 * this.reps) * 100) / 100
        : Math.round(this.weightToKg * (1 + 0.033 * this.reps) * 100) / 100;
    },
    weightToKg() {
      return this.weight / 2.20462262;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 25px;
}

.weight {
  width: 103px;
}

.reps {
  width: 89px;
}
</style>
