<template>
  <div>
    <div class="box">
      <h1 class="has-text-centered title">
        <b-tooltip
          label="Body mass index (BMI) is a value derived from the mass (weight) and height of a person. The BMI is a convenient rule of thumb used to broadly categorize a person as underweight, normal weight, overweight, or obese based on tissue mass and height."
          position="is-bottom"
          :size="getTooltipSize"
          multilined
          dashed
          type="is-primary"
        >
          <span>BMI</span>
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
      <div class="mt-4 is-size-5 has-text-centered">
        Your
        <b-tooltip
          label="Body mass index (BMI) is a value derived from the mass (weight) and height of a person. The BMI is a convenient rule of thumb used to broadly categorize a person as underweight, normal weight, overweight, or obese based on tissue mass and height."
          position="is-top"
          :size="getTooltipSize"
          multilined
          dashed
          type="is-primary"
        >
          <span>BMI</span>
        </b-tooltip>
        is <span class="has-text-weight-bold">{{ getBMI }}</span>
      </div>
    </div>
    <div class="box">
      <h2 class="title is-size-3">BMI Categories</h2>
      <b-table
        :selected.sync="selected"
        :striped="true"
        :data="BMITable"
        :columns="BMIColumns"
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
      BMITable: [
        { category: 'Very severely underweight', BMI: '<15' },
        { category: 'Severely underweight', BMI: '15–⁠16' },
        { category: 'Underweight', BMI: '16⁠⁠⁠–18.5⁠' },
        { category: 'Normal (healthy weight)', BMI: '18.5–25⁠' },
        { category: 'Overweight', BMI: '25–30⁠' },
        { category: 'Obese Class I (Moderately obese)', BMI: '30–⁠35' },
        { category: 'Obese Class II (Severely obese)', BMI: '35–40⁠' },
        { category: 'Obese Class II (Severely obese)', BMI: '>40' },
      ],
      BMIColumns: [
        {
          field: 'category',
          label: 'Category',
          numeric: false,
          centered: true,
        },
        {
          field: 'BMI',
          label: 'BMI',
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
    getBMILevel(BMI) {
      switch (true) {
        case BMI <= 15:
          this.selected = this.BMITable[0];
          return 'Very severely underweight';
        case BMI > 15 && BMI <= 16:
          this.selected = this.BMITable[1];
          return 'Severely underweight';
        case BMI > 16 && BMI <= 18.5:
          this.selected = this.BMITable[2];
          return 'Underweight';
        case BMI > 18.5 && BMI <= 25:
          this.selected = this.BMITable[3];
          return 'Normal (healthy weight)';
        case BMI > 25 && BMI <= 30:
          this.selected = this.BMITable[4];
          return 'Overweight';
        case BMI > 30 && BMI <= 35:
          this.selected = this.BMITable[5];
          return 'Obese Class I (Moderately obese)';
        case BMI > 35 && BMI <= 40:
          this.selected = this.BMITable[6];
          return 'Obese Class II (Severely obese)';
        case BMI > 40:
          this.selected = this.BMITable[6];
          return 'Obese Class III (Very severely obese)';
        default:
          return 'Something broke';
      }
    },
  },
  computed: {
    getTooltipSize() {
      return screen.width >= 540 ? 'is-large' : 'is-small';
    },
    getBMI() {
      return this.units === 'metric'
        ? this.round(this.weight.metric / (this.height.metric / 100) ** 2, 2)
        : this.round(
            (this.weight.imperial /
              (this.height.imperial.feet * 12 +
                Number.parseInt(this.height.imperial.inches, 10)) **
                2) *
              703,
            2
          );
    },
  },
  mounted() {
    this.getBMILevel(this.getBMI);
  },
  beforeUpdate() {
    this.getBMILevel(this.getBMI);
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
