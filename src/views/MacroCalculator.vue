<template>
  <div>
    <div class="box">
      <h1 class="has-text-centered title">
        <b-tooltip
          label="Macro calculator gives you the ideal macronutrient distribution given your total calorie intake, your goal and weight."
          position="is-bottom"
          :size="getTooltipSize"
          multilined
          dashed
          type="is-primary"
        >
          <span>Macro</span>
        </b-tooltip>
        Calculator
      </h1>

      <!-- Units selected? -->
      <b-field label="Which units?">
        <b-radio v-model="units" name="units" native-value="metric">
          Metric
        </b-radio>
        <b-radio v-model="units" name="units" native-value="imperial">
          Imperial
        </b-radio>
      </b-field>

      <!-- Total kcal -->
      <b-field
        label="Total kcal per day"
        :type="{ 'is-danger': totalKcal <= 0 }"
      >
        <b-input
          class="total"
          type="number"
          v-model="totalKcal"
          min="1"
          extended
        ></b-input>
        <p class="control">
          <span class="button is-static">kcal</span>
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

      <!-- Goal -->
      <b-tooltip
        label="Click on me for more info!"
        position="is-right"
        dashed
        type="is-primary"
        class="mb-2"
      >
        <b-field label-for="activity-level"
          ><span @click="isGoalModalActive = true" class="goalSpan"
            >Goal</span
          ></b-field
        >
      </b-tooltip>
      <b-field name="activity-level">
        <b-select v-model="goalValue">
          <option
            v-for="(option, index) in goalOptions"
            :value="option.value"
            :key="index"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
    </div>

    <!-- Macro Table -->
    <div class="box">
      <h2 class="title is-size-3 has-text-centered">Macros Distribution</h2>
      <b-table
        :striped="true"
        :data="macrosTable"
        :columns="macrosColumns"
        :mobile-cards="false"
      ></b-table>
    </div>

    <!-- Goal Modal -->
    <b-modal v-model="isGoalModalActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <h2>Macro distribution formula</h2>

            Protein is set up as follows:
            <br />
            1.8 g/kg when gaining or maintaining weight
            <br />
            2 g/kg when in 20% and smaller deficit
            <br />
            2.2 g/kg when in 25% and smaller deficit
            <br />
            2.4 g/kg when in 30% and smaller deficit
            <br />
            2.6 g/kg when in greater than 30% deficit
            <br />
            <br />
            Fat is set up as follows:
            <br />
            25 % of your total calorie intake when gaining weight
            <br />
            20 % of your total calorie intake when maintaining weight
            <br />
            17.5 % of your total calorie intake when in 20% and smaller deficit
            <br />
            15 % of your total calorie intake when in 25% and smaller deficit
            <br />
            12.5 % of your total calorie intake when in 30% and smaller deficit
            <br />
            10 % of your total calorie intake when in greater than 30% deficit
            <br />
            <br />
            Carbs make up what's left.
            <br />
            <br />
            Macros are set up according to
            <a href="http://www.johk.pl/files/10078-71-2020-v71-2020-08.pdf"
              >this</a
            >
            study.
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isGoalModalActive: false,
      goalValue: 0,
      units: 'metric',
      totalKcal: 2000,
      weight: {
        metric: 80,
        imperial: 170,
      },
      macros: {
        protein: undefined,
        carbs: undefined,
        fat: undefined,
      },
      macrosColumns: [
        {
          field: 'protein',
          label: 'Protein',
          numeric: true,
          centered: true,
        },
        {
          field: 'carbs',
          label: 'Carbs',
          numeric: true,
          centered: true,
        },
        {
          field: 'fat',
          label: 'Fat',
          numeric: true,
          centered: true,
        },
      ],
      macrosTable: undefined,
      goalOptions: [
        {
          name: 'Weight Loss (>30% deficit)',
          value: -4,
        },
        {
          name: 'Weight Loss (<30% deficit)',
          value: -3,
        },
        {
          name: 'Weight Loss (<25% deficit)',
          value: -2,
        },
        {
          name: 'Weight Loss (<20% deficit)',
          value: -1,
        },
        {
          name: 'Maintain or Gain Weight',
          value: 0,
          selected: true,
        },
        {
          name: 'Gain Weight',
          value: 1,
        },
      ],
    };
  },
  methods: {
    round(number, places) {
      return Math.round(number * 10 ** places) / 10 ** places;
    },
    getMacros() {
      if (this.goalValue === 1) {
        return {
          protein: this.round(this.getProtein(this.units, this.weight, 1.8), 0),
          fat: this.round((this.totalKcal * 0.25) / 9, 0),
          carbs: this.round(
            (this.totalKcal -
              this.getProtein(this.units, this.weight, 1.8) * 4 -
              this.totalKcal * 0.25) /
              4,
            0
          ),
        };
      }
      if (this.goalValue === 0) {
        return {
          protein: this.round(this.getProtein(this.units, this.weight, 1.8), 0),
          fat: this.round((this.totalKcal * 0.2) / 9, 0),
          carbs: this.round(
            (this.totalKcal -
              this.getProtein(this.units, this.weight, 1.8) * 4 -
              this.totalKcal * 0.2) /
              4,
            0
          ),
        };
      }
      if (this.goalValue === -1) {
        return {
          protein: this.round(this.getProtein(this.units, this.weight, 2), 0),
          fat: this.round((this.totalKcal * 0.175) / 9, 0),
          carbs: this.round(
            (this.totalKcal -
              this.getProtein(this.units, this.weight, 2) * 4 -
              this.totalKcal * 0.175) /
              4,
            0
          ),
        };
      }
      if (this.goalValue === -2) {
        return {
          protein: this.round(this.getProtein(this.units, this.weight, 2.2), 0),
          fat: this.round((this.totalKcal * 0.15) / 9, 0),
          carbs: this.round(
            (this.totalKcal -
              this.getProtein(this.units, this.weight, 2.2) * 4 -
              this.totalKcal * 0.15) /
              4,
            0
          ),
        };
      }
      if (this.goalValue === -3) {
        return {
          protein: this.round(this.getProtein(this.units, this.weight, 2.4), 0),
          fat: this.round((this.totalKcal * 0.125) / 9, 0),
          carbs: this.round(
            (this.totalKcal -
              this.getProtein(this.units, this.weight, 2.4) * 4 -
              this.totalKcal * 0.125) /
              4,
            0
          ),
        };
      }
      if (this.goalValue === -4) {
        return {
          protein: this.round(this.getProtein(this.units, this.weight, 2.6), 0),
          fat: this.round((this.totalKcal * 0.1) / 9, 0),
          carbs: this.round(
            (this.totalKcal -
              this.getProtein(this.units, this.weight, 2.6) * 4 -
              this.totalKcal * 0.1) /
              4,
            0
          ),
        };
      }
    },
    getProtein(units, weights, multiplier) {
      if (units === 'metric') return weights.metric * multiplier;
      return (weights.imperial / 2.20462262) * multiplier;
    },
  },
  computed: {
    getTooltipSize() {
      return screen.width >= 540 ? 'is-large' : 'is-small';
    },
  },
  mounted() {
    this.getMacros();
    this.macrosTable = [
      {
        protein: `${this.getMacros().protein}g`,
        carbs: `${this.getMacros().carbs}g`,
        fat: `${this.getMacros().fat}g`,
      },
    ];
  },
  beforeUpdate() {
    this.getMacros();
    this.macrosTable = [
      {
        protein: `${this.getMacros().protein}g`,
        carbs: `${this.getMacros().carbs}g`,
        fat: `${this.getMacros().fat}g`,
      },
    ];
  },
};
</script>

<style lang="scss" scoped>
.box {
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 25px;
}

.total {
  width: 93px;
}

.weight {
  width: 103px;
}

.goalSpan {
  color: #363636;
  cursor: pointer;
  font-weight: 600;
}

.height {
  width: 100px;
}
</style>
