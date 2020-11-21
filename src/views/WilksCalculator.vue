<template>
  <div>
    <div class="box">
      <h1 class="has-text-centered title">
        <b-tooltip
          label="The Wilks Formula is a method by which the strength of a powerlifter is measured against the performances of other lifters of different bodyweights."
          position="is-bottom"
          :size="getTooltipSize"
          multilined
          dashed
          type="is-primary"
        >
          <span>Wilks</span>
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

        <!-- Sex? -->
        <b-field label="Sex">
          <b-radio v-model="sex" name="sex" native-value="male">
            Male
          </b-radio>
          <b-radio v-model="sex" name="sex" native-value="female">
            Female
          </b-radio>
        </b-field>

        <!-- Weight -->
        <b-field label="Weight" :type="{ 'is-danger': weight <= 0 }">
          <b-input
            class="weight"
            type="number"
            v-model="weight"
            min="1"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">{{
              units === 'metric' ? 'kg' : 'lb'
            }}</span>
          </p>
        </b-field>

        <!-- Bench press -->
        <b-field
          label="Benchpress"
          :type="{ 'is-danger': lifted.benchpress <= 0 }"
        >
          <b-input
            class="weight"
            type="number"
            v-model="lifted.benchpress"
            min="0"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">{{
              units === 'metric' ? 'kg' : 'lb'
            }}</span>
          </p>
        </b-field>

        <!-- Squat -->
        <b-field label="Squat" :type="{ 'is-danger': lifted.squat <= 0 }">
          <b-input
            class="weight"
            type="number"
            v-model="lifted.squat"
            min="0"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">{{
              units === 'metric' ? 'kg' : 'lb'
            }}</span>
          </p>
        </b-field>

        <!-- Deadlift -->
        <b-field label="Deadlift" :type="{ 'is-danger': lifted.deadlift <= 0 }">
          <b-input
            class="weight"
            type="number"
            v-model="lifted.deadlift"
            min="0"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">{{
              units === 'metric' ? 'kg' : 'lb'
            }}</span>
          </p>
        </b-field>

        <!-- Result -->
        <div class="mt-4 is-size-5 has-text-centered has-text-weight-bold">
          Your
          <b-tooltip
            label="The Wilks Formula is a method by which the strength of a powerlifter is measured against the performances of other lifters of different bodyweights."
            position="is-top"
            :size="getTooltipSize"
            multilined
            dashed
            type="is-primary"
          >
            <span>Wilks</span>
          </b-tooltip>
          is {{ getWilks }}
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    units: 'metric',
    sex: 'male',
    lifted: {
      benchpress: 100,
      squat: 140,
      deadlift: 180,
    },
    weight: 80,
  }),
  methods: {},
  computed: {
    getTooltipSize() {
      return screen.width >= 540 ? 'is-large' : 'is-small';
    },
    getWilks() {
      return this.sex === 'male'
        ? this.units === 'metric'
          ? Math.round(
              ((this.getTotal * 500) /
                (-216.0475144 +
                  16.2606339 * this.weight +
                  -0.002388645 * this.weight ** 2 +
                  -0.00113732 * this.weight ** 3 +
                  7.01863e-6 * this.weight ** 4 +
                  -1.291e-8 * this.weight ** 5)) *
                100
            ) / 100
          : Math.round(
              ((this.totalToKg * 500) /
                (-216.0475144 +
                  16.2606339 * this.weightToKg +
                  -0.002388645 * this.weightToKg ** 2 +
                  -0.00113732 * this.weightToKg ** 3 +
                  7.01863e-6 * this.weightToKg ** 4 +
                  -1.291e-8 * this.weightToKg ** 5)) *
                100
            ) / 100
        : this.units === 'metric'
        ? Math.round(
            ((this.getTotal * 500) /
              (594.31747775582 +
                -27.23842536447 * this.weight +
                0.82112226871 * this.weight ** 2 +
                -0.00930733913 * this.weight ** 3 +
                4.731582e-5 * this.weight ** 4 +
                -9.054e-8 * this.weight ** 5)) *
              100
          ) / 100
        : Math.round(
            ((this.totalToKg * 500) /
              (594.31747775582 +
                -27.23842536447 * this.weightToKg +
                0.82112226871 * this.weightToKg ** 2 +
                -0.00930733913 * this.weightToKg ** 3 +
                4.731582e-5 * this.weightToKg ** 4 +
                -9.054e-8 * this.weightToKg ** 5)) *
              100
          ) / 100;
    },
    getTotal() {
      return (
        Number.parseInt(this.lifted.benchpress) +
        Number.parseInt(this.lifted.squat) +
        Number.parseInt(this.lifted.deadlift)
      );
    },
    weightToKg() {
      return this.weight / 2.20462262;
    },
    totalToKg() {
      return this.getTotal / 2.20462262;
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

.age {
  width: 83px;
}

.weight {
  width: 103px;
}

.height {
  width: 100px;
}
</style>
