<template>
  <div>
    <div class="box pb-5">
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
            step="any"
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
            step="any"
            v-model="reps"
            min="1"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">reps</span>
          </p>
        </b-field>

        <!-- Result -->
        <div class="mt-4 is-size-5 has-text-centered">
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
          is
          <span class="has-text-weight-bold"
            >{{ round(get1RM(), 2) }}
            {{ this.units === 'metric' ? 'kg' : 'lb' }}</span
          >
        </div>
      </section>
    </div>
    <div class="box">
      <h2 class="title is-size-3">Percentages of 1RM</h2>
      <b-table
        :data="get1RMPercentagesTable(15)"
        :columns="percentagesCollumn"
        :striped="true"
        :mobile-cards="false"
      ></b-table>
    </div>
    <div class="box">
      <h2 class="title is-size-3">Rep Maxes</h2>
      <b-table
        :striped="true"
        :data="getRepsTable(30)"
        :columns="repsCollumn"
        :mobile-cards="false"
      ></b-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentagesCollumn: [
        {
          field: 'RMPercentage',
          label: '% of 1RM',
          numeric: true,
          centered: true,
        },
        {
          field: 'liftedWeight',
          label: 'Lifted Weight',
          numeric: true,
          centered: true,
        },
        {
          field: 'reps',
          label: 'Reps',
          numeric: true,
          centered: true,
        },
      ],
      repsCollumn: [
        {
          field: 'reps',
          label: 'Reps',
          numeric: true,
          centered: true,
        },
        {
          field: 'liftedWeight',
          label: 'Lifted Weight',
          numeric: true,
          centered: true,
        },
        {
          field: 'RMPercentage',
          label: '% of 1RM',
          numeric: true,
          centered: true,
        },
      ],
      units: 'metric',
      reps: 1,
      weight: 100,
    };
  },
  watch: {
    weight() {
      this.get1RMPercentagesTable(15);
      this.getRepsTable(30);
    },
  },
  methods: {
    get1RMPercentagesTable(numberOfPercentages) {
      const RMPercentagesTable = [...Array(numberOfPercentages).keys()].map(
        (percentage) => {
          return {
            RMPercentage: 100 - percentage * 5 + '%',
            liftedWeight:
              this.round(this.getLiftedWeight(percentage), 1) +
              `${this.units === 'metric' ? ' kg' : ' lb'}`,

            reps: this.round(this.getReps(percentage), 1),
          };
        }
      );
      return RMPercentagesTable;
    },
    getRepsTable(numberOfReps) {
      const oneRM = this.get1RM();
      const repsTable = [...Array(numberOfReps).keys()].map((rep) => {
        return {
          reps: rep + 1,
          liftedWeight:
            this.round(oneRM / (36 / (37 - (rep + 1))), 1) +
            `${this.units === 'metric' ? ' kg' : ' lb'}`,
          RMPercentage:
            this.round((oneRM / (36 / (37 - (rep + 1))) / oneRM) * 100, 1) +
            '%',
        };
      });
      return repsTable;
    },
    get1RM() {
      return this.weight * (36 / (37 - this.reps));
    },
    getReps(pos) {
      // Formula assumes reps > 1
      if (pos === 0) return 1;
      return (
        (this.getLiftedWeight(0) /
          (this.getLiftedWeight(0) * (1 - pos * 0.05)) -
          1) /
        (1 / 30)
      );
    },
    getLiftedWeight(fiveStepsFrom100) {
      return this.get1RM() * (1 - fiveStepsFrom100 * 0.05);
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
};
</script>

<style lang="scss" scoped>
.box {
  max-width: 600px;
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
