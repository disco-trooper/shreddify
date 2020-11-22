<template>
  <div>
    <div class="box">
      <h1 class="has-text-centered title">
        <b-tooltip
          label="Basal metabolic rate (BMR) is defined as the rate at which your body uses energy when you are resting in order to keep vital functions going such as breathing."
          position="is-bottom"
          :size="getTooltipSize"
          multilined
          dashed
          type="is-primary"
        >
          <span>BMR</span>
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

        <!-- Bodyfat selected? -->
        <b-field
          label="Do you know your bodyfat? (the result will be more accurate)"
        >
          <b-radio
            v-model="bodyfatSelected"
            name="bodyfatSelected"
            :native-value="true"
          >
            Yes
          </b-radio>
          <b-radio
            v-model="bodyfatSelected"
            name="bodyfatSelected"
            :native-value="false"
          >
            No
          </b-radio>
        </b-field>

        <!-- Bodyfat -->
        <b-field
          label="Bodyfat"
          :type="{ 'is-danger': bodyfat <= 0 }"
          v-if="bodyfatSelected"
        >
          <b-input
            class="weight"
            type="number"
            v-model="bodyfat"
            min="1"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">%</span>
          </p>
        </b-field>

        <!-- Sex? -->
        <b-field label="Sex" v-if="!bodyfatSelected">
          <b-radio v-model="sex" name="sex" native-value="male">
            Male
          </b-radio>
          <b-radio v-model="sex" name="sex" native-value="female">
            Female
          </b-radio>
        </b-field>

        <!-- Age -->
        <b-field
          label="Age"
          :type="{ 'is-danger': age <= 0 }"
          v-if="!bodyfatSelected"
        >
          <b-input
            class="age"
            type="number"
            v-model="age"
            min="1"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">years</span>
          </p>
        </b-field>

        <!-- Metric height -->
        <b-field
          label="Height"
          :type="{ 'is-danger': height.metric <= 0 }"
          v-if="units === 'metric' && !bodyfatSelected"
        >
          <b-input
            type="number"
            v-model="height.metric"
            class="height"
            min="1"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">cm</span>
          </p>
        </b-field>

        <!-- Imperial height -->
        <b-field
          label="Height"
          :type="{
            'is-danger':
              height.imperial.inches < 0 || height.imperial.feet <= 0,
          }"
          v-if="units === 'imperial' && !bodyfatSelected"
        >
          <b-input
            type="number"
            v-model="height.imperial.feet"
            min="1"
            class="height"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">feet</span>
          </p>
          <b-input
            type="number"
            v-model="height.imperial.inches"
            min="0"
            class="height"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">inches</span>
          </p>
        </b-field>

        <!-- Weight Metric -->
        <b-field
          label="Weight"
          :type="{ 'is-danger': weight <= 0 }"
          v-if="units === 'metric'"
        >
          <b-input
            class="weight"
            type="number"
            v-model="weight.metric"
            min="1"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">kg</span>
          </p>
        </b-field>

        <!-- Weight Imperial -->
        <b-field label="Weight" :type="{ 'is-danger': weight <= 0 }" v-else>
          <b-input
            class="weight"
            type="number"
            v-model="weight.imperial"
            min="1"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">lb</span>
          </p>
        </b-field>
      </section>

      <!-- Result -->
      <div class="mt-4 is-size-5 has-text-centered has-text-weight-bold">
        Your
        <b-tooltip
          label="Basal metabolic rate (BMR) is defined as the rate at which your body uses energy when you are resting in order to keep vital functions going such as breathing."
          position="is-top"
          :size="getTooltipSize"
          multilined
          dashed
          type="is-primary"
        >
          <span>BMR</span>
        </b-tooltip>
        is {{ bodyfatSelected ? getBFBMR : getBMR }} kcal
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    bodyfatSelected: false,
    bodyfat: 12,
    units: 'metric',
    sex: 'male',
    age: 22,
    height: {
      metric: 183,
      imperial: {
        feet: 6,
        inches: 0,
      },
    },
    weight: {
      metric: 80,
      imperial: 180,
    },
  }),
  computed: {
    getTooltipSize() {
      return screen.width >= 540 ? 'is-large' : 'is-small';
    },
    getBFBMR() {
      return this.units === 'metric'
        ? Math.round(
            370 + 21.6 * ((this.weight.metric * (100 - this.bodyfat)) / 100)
          )
        : Math.round(
            370 +
              21.6 *
                (((this.weight.imperial / 2.205) * (100 - this.bodyfat)) / 100)
          );
    },
    getBMR() {
      return this.units === 'metric'
        ? this.sex === 'male'
          ? Math.round(
              this.weight.metric * 10 +
                6.25 * this.height.metric -
                5 * this.age +
                5
            )
          : Math.round(
              this.weight.metric * 10 +
                6.25 * this.height.metric -
                5 * this.age -
                161
            )
        : this.sex === 'male'
        ? Math.round(
            4.536 * Number.parseInt(this.weight.imperial) +
              15.88 *
                (Number.parseInt(this.height.imperial.feet) * 12 +
                  Number.parseInt(this.height.imperial.inches)) -
              5 * Number.parseInt(this.age) +
              5
          )
        : Math.round(
            4.536 * Number.parseInt(this.weight.imperial) +
              15.88 *
                (Number.parseInt(this.height.imperial.feet) * 12 +
                  Number.parseInt(this.height.imperial.inches)) -
              5 * Number.parseInt(this.age) -
              161
          );
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
