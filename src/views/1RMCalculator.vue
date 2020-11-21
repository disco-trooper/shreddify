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
              units === 'metric' ? 'kg' : 'lb'
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
          is {{ round(get1RM(), 1) }}
          {{ this.units === 'metric' ? 'kg' : 'lb' }}
        </div>
        <div>{{ RMPercentages }}</div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      units: 'metric',
      reps: 5,
      weight: 100,
      RM: '?',
      RMPercentages: [
        {
          RMPercentage: 100,
          liftedWeight: undefined,
          reps: undefined,
        },
        {
          RMPercentage: 95,
          liftedWeight: undefined,
          reps: undefined,
        },
        {
          RMPercentage: 90,
          liftedWeight: undefined,
          reps: undefined,
        },
        {
          RMPercentage: 85,
          liftedWeight: undefined,
          reps: undefined,
        },
        {
          RMPercentage: 80,
          liftedWeight: undefined,
          reps: undefined,
        },
        {
          RMPercentage: 75,
          liftedWeight: undefined,
          reps: undefined,
        },
        {
          RMPercentage: 70,
          liftedWeight: undefined,
          reps: undefined,
        },
        {
          RMPercentage: 65,
          liftedWeight: undefined,
          reps: undefined,
        },
        {
          RMPercentage: 60,
          liftedWeight: undefined,
          reps: undefined,
        },
        {
          RMPercentage: 55,
          liftedWeight: undefined,
          reps: undefined,
        },
        {
          RMPercentage: 50,
          liftedWeight: undefined,
          reps: undefined,
        },
      ],
      RepTable: [
        {
          reps: 1,
          weight: undefined,
          percentage: undefined,
        },
      ],
    };
  },
  watch: {
    weight() {
      this.get1RMPercentages(11);
    },
  },
  methods: {
    get1RMPercentages(numberOfPercentages) {
      for (let i = 0; i < numberOfPercentages; i++) {
        this.RMPercentages[i].liftedWeight = this.round(
          this.getLiftedWeight(i),
          1
        );
        this.RMPercentages[i].reps = this.round(this.getReps(i), 1);
      }
    },
    get1RM() {
      return this.weight / (1.0278 - 0.0278 * this.reps);
    },
    getReps(pos) {
      if (pos === 0) return 1;
      return (
        (this.getLiftedWeight(0) /
          (this.getLiftedWeight(0) * (1 - pos * 0.05)) -
          1) /
        0.033
      );
    },
    getLiftedWeight(fiveStepsFrom100) {
      return (
        (this.weight / (1.0278 - 0.0278 * this.reps)) *
        (1 - fiveStepsFrom100 * 0.05)
      );
    },
    round(number, places) {
      return Math.round(number * 10 ** places) / 10 ** places;
    },
  },
  computed: {
    getTooltipSize() {
      return screen.width >= 540 ? 'is-large' : 'is-small';
    },
  },
  created() {
    this.get1RMPercentages(11);
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
