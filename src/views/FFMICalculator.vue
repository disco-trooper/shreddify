<template>
  <div>
    <div class="box">
      <h1 class="has-text-centered title">
        <b-tooltip
          label="The fat-free mass index, known as FFMI, indicates the body’s muscle development."
          position="is-bottom"
          :size="getTooltipSize"
          multilined
          dashed
          type="is-primary"
        >
          <span>FFMI</span>
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

        <!-- Metric height -->
        <b-field
          v-if="units === 'metric'"
          label="Height"
          :type="{ 'is-danger': height.metric <= 0 }"
        >
          <b-input
            type="number"
            v-model="height.metric"
            step="any"
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
          v-else
          label="Height"
          :type="{
            'is-danger':
              height.imperial.inches < 0 || height.imperial.feet <= 0,
          }"
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
            step="any"
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
            step="any"
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
            step="any"
            v-model="weight.imperial"
            min="1"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">lb</span>
          </p>
        </b-field>
      </section>

      <!-- Bodyfat -->
      <b-field
        class="mt-2"
        label="Bodyfat"
        :type="{ 'is-danger': bodyfat <= 0 }"
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

      <!-- Result -->
      <div class="mt-4 is-size-5 has-text-centered">
        Your
        <b-tooltip
          label="The fat-free mass index, known as FFMI, indicates the body’s muscle development."
          position="is-top"
          :size="getTooltipSize"
          multilined
          dashed
          type="is-primary"
        >
          <span>FFMI</span>
        </b-tooltip>
        is <span class="has-text-weight-bold">{{ getFFMI }}</span>
      </div>
      <div class="mt-4 is-size-5 has-text-centered">
        Your
        <b-tooltip
          label="Normalized FFMI is just FFMI better adjusted for height."
          position="is-top"
          :size="getTooltipSize"
          multilined
          dashed
          type="is-primary"
        >
          <span>normalized FFMI</span>
        </b-tooltip>
        is <span class="has-text-weight-bold">{{ getNormalizedFFMI }}</span>
      </div>
    </div>
    <div class="box">
      <h2 class="title is-size-3">FFMI Categories</h2>
      <b-table
        :selected.sync="selected"
        :striped="true"
        :data="FFMITable"
        :columns="FFMIColumns"
        :mobile-cards="false"
      ></b-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      units: 'metric',
      bodyfat: 12,
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
      FFMITable: [
        { category: 'Below average', FFMI: '<18' },
        { category: 'Average', FFMI: '18-20' },
        { category: 'Above average', FFMI: '20-22' },
        { category: 'Excellent', FFMI: '22-23⁠' },
        { category: 'Superior', FFMI: '23-26' },
        { category: 'Suspicion of steroid use', FFMI: '26-28' },
        { category: 'Steroid use likely', FFMI: '>28' },
      ],
      FFMIColumns: [
        {
          field: 'category',
          label: 'Category',
          numeric: false,
          centered: true,
        },
        {
          field: 'FFMI',
          label: 'FFMI',
          numeric: true,
          centered: true,
        },
      ],
      selected: undefined,
    };
  },
  methods: {
    round(number, places) {
      return Math.round(number * 10 ** places) / 10 ** places;
    },
    getFFMILevel(FFMI) {
      switch (true) {
        case FFMI <= 18:
          this.selected = this.FFMITable[0];
          return 'Bellow average';
        case FFMI > 18 && FFMI <= 20:
          this.selected = this.FFMITable[1];
          return 'Average';
        case FFMI > 20 && FFMI <= 22:
          this.selected = this.FFMITable[2];
          return 'Above average';
        case FFMI > 22 && FFMI <= 23:
          this.selected = this.FFMITable[3];
          return 'Excellent';
        case FFMI > 23 && FFMI <= 26:
          this.selected = this.FFMITable[4];
          return 'Superior';
        case FFMI > 26 && FFMI <= 28:
          this.selected = this.FFMITable[5];
          return 'Suspicion of steroid use';
        case FFMI > 28:
          this.selected = this.FFMITable[6];
          return 'Steroid use likely';
        default:
          return 'Something broke';
      }
    },
  },

  computed: {
    getTooltipSize() {
      return screen.width >= 540 ? 'is-large' : 'is-small';
    },
    getFFMI() {
      return this.units === 'metric'
        ? this.round(
            (this.weight.metric * (1 - this.bodyfat / 100)) /
              (this.height.metric / 100) ** 2,
            2
          )
        : this.round(
            ((Number.parseInt(this.weight.imperial) / 2.20462262) *
              (1 - this.bodyfat / 100)) /
              ((Number.parseInt(this.height.imperial.inches) +
                Number.parseInt(this.height.imperial.feet) * 12) /
                39.3700787) **
                2,
            2
          );
    },
    getNormalizedFFMI() {
      return this.units === 'metric'
        ? this.round(this.getFFMI + 6.1 * (1.8 - this.height.metric / 100), 2)
        : this.round(
            this.getFFMI +
              6.1 *
                (1.8 -
                  (Number.parseInt(this.height.imperial.inches) +
                    Number.parseInt(this.height.imperial.feet) * 12) /
                    39.3700787),
            2
          );
    },
  },
  mounted() {
    this.getFFMILevel(this.getFFMI);
  },
  beforeUpdate() {
    this.getFFMILevel(this.getFFMI);
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
