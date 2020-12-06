<template>
  <div>
    <div class="box">
      <h1 class="has-text-centered title">
        <b-tooltip
          label="Click for more info!"
          position="is-bottom"
          dashed
          type="is-primary"
        >
          <span style="cursor: pointer" @click="isTDEEModalActive = true"
            >TDEE</span
          >
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

        <!-- Activity level -->
        <b-tooltip
          label="Click for more info!"
          position="is-right"
          dashed
          type="is-primary"
          class="mb-2"
        >
          <b-field label-for="activity-level"
            ><span @click="isActivityModalActive = true" class="activitySpan"
              >Activity level</span
            ></b-field
          >
        </b-tooltip>
        <b-field name="activity-level">
          <b-select placeholder="Sedentary" v-model="activityMultiplier">
            <option
              v-for="(option, index) in activityOptions"
              :value="option.value"
              :key="index"
            >
              {{ option.name }}
            </option>
          </b-select>
        </b-field>

        <!-- Goal -->
        <b-field label="Goal" name="activity-level">
          <b-select v-model="goalMultiplier">
            <option
              v-for="(option, index) in goalOptions"
              :value="option.value"
              :key="index"
            >
              {{ option.name }}
            </option>
          </b-select>
        </b-field>

        <!-- Multiplier -->
        <b-tooltip
          v-if="goalMultiplier === 'custom'"
          label="Enter % multiplier for surplus/deficit (eg. -10, -5, 5, 10)"
          position="is-right"
          dashed
          type="is-primary"
          class="mb-2"
        >
          <b-field label-for="activity-level"
            ><span class="activitySpan">TDEE Multiplier</span></b-field
          >
        </b-tooltip>
        <b-field v-if="goalMultiplier === 'custom'">
          <b-input
            class="multiplier"
            type="number"
            v-model="customMultiplier"
            min="-100"
            max="100"
            extended
          ></b-input>
          <p class="control">
            <span class="button is-static">%</span>
          </p>
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
            step="any"
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

      <!-- Result -->
      <div class="mt-4 is-size-5 has-text-centered">
        Your
        <b-tooltip
          label="Click for more info!"
          position="is-top"
          dashed
          type="is-primary"
        >
          <span style="cursor: pointer" @click="isTDEEModalActive = true"
            >TDEE</span
          >
        </b-tooltip>
        is
        <span class="has-text-weight-bold">{{ getResult() }} kcal</span>
      </div>

      <!-- TDEE Modal -->
      <b-modal v-model="isTDEEModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="content">
              Your TDEE is your ‘total daily energy expenditure’. This is the
              amount of energy, i.e. calories, your body burns every day
              performing its bodily functions and also physical movement like
              daily activities and exercise.
              <br />
              <br />
              It’s useful to calculate your TDEE to know how many calories you
              should be eating to maintain, lose, or gain weight (dependent on
              your goals).
              <br />
              <br />
              Not everyone’s TDEE is the same, as lots of factors can affect how
              much energy your body burns every day, like age, gender, height,
              weight, genetics, and activity level (i.e. how much you move).
            </div>
          </div>
        </div>
      </b-modal>

      <!-- Activity Modal -->
      <b-modal v-model="isActivityModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <b>Sedentary</b> -
              <span class="activityInfo"
                >Sedentary Lifestyle, Little or No Exercise, Moderate Walking,
                Desk Job (Away from Home)</span
              >
              <br />
              <br />
              <b>Slightly active</b> -
              <span class="activityInfo"
                >Slightly Active, Exercise or Light Sports 1 to 3 Days a Week,
                Light Jogging or Walking 3 to 4 Days a Week</span
              >
              <br />
              <br />
              <b>Moderately active</b> -
              <span class="activityInfo"
                >Moderately Active, Physical Work, Exercise, or Sports 4 to 5
                Days a Week, Construction Laborer</span
              >
              <br />
              <br />
              <b>Very active</b> -
              <span class="activityInfo"
                >Very Active, Heavy Physical Work, Exercise, or Sports 6 to 7
                Days a Week, Hard Laborer</span
              >
              <br />
              <br />
              <b>Extremely active</b> -
              <span class="activityInfo"
                >Extremely Active, Very Heavy Physical Work or Exercise Every
                Day, Professional/Olympic Athlete</span
              >
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isTDEEModalActive: false,
    isActivityModalActive: false,
    bodyfatSelected: false,
    bodyfat: 12,
    units: 'metric',
    sex: 'male',
    activityMultiplier: 1.2,
    goalMultiplier: 1,
    customMultiplier: 0,
    activityOptions: [
      {
        name: 'Sedentary',
        value: 1.2,
        selected: true,
      },
      {
        name: 'Slightly active (light exercise 1-3x/week)',
        value: 1.375,
      },
      {
        name: 'Lightly active (moderate exercise 2-3x/week)',
        value: 1.425,
      },
      {
        name: 'Moderately active (exercise 4-5x/week)',
        value: 1.55,
      },
      {
        name: 'Very active (exercise 6-7x/week)',
        value: 1.75,
      },
      {
        name: 'Extremely active (professional athlete)',
        value: 1.9,
      },
    ],
    goalOptions: [
      {
        name: 'Weight Loss (30% deficit) - Madness',
        value: 0.7,
      },
      {
        name: 'Weight Loss (25% deficit) - Aggressive',
        value: 0.75,
      },
      {
        name: 'Weight Loss (20% deficit) - Suggested',
        value: 0.8,
      },
      {
        name: 'Maintain Weight',
        value: 1,
        selected: true,
      },
      {
        name: 'Custom',
        value: 'custom',
      },
      {
        name: 'Gain Weight (10% surplus) - Suggested',
        value: 1.1,
      },
      {
        name: 'Gain Weight (15% surplus) - Aggressive',
        value: 1.15,
      },
      {
        name: "Gain Weight (20% surplus) - You'll be fat",
        value: 1.2,
      },
    ],
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
  methods: {
    round(number, places) {
      return Math.round(number * 10 ** places) / 10 ** places;
    },
    getResult() {
      if (this.bodyfatSelected) {
        if (this.goalMultiplier === 'custom')
          return this.round(this.getBFTDEE * this.getConvertedMultiplier, 0);
        return this.round(this.getBFTDEE * this.goalMultiplier, 0);
      }
      if (this.goalMultiplier === 'custom')
        return this.round(this.getTDEE * this.getConvertedMultiplier, 0);
      return this.round(this.getTDEE * this.goalMultiplier, 0);
    },
  },
  computed: {
    getConvertedMultiplier() {
      return this.customMultiplier / 100 + 1;
    },
    getTooltipSize() {
      return screen.width >= 540 ? 'is-large' : 'is-small';
    },
    getBFTDEE() {
      return this.units === 'metric'
        ? (370 + 21.6 * ((this.weight.metric * (100 - this.bodyfat)) / 100)) *
            this.activityMultiplier
        : (370 +
            21.6 *
              (((this.weight.imperial / 2.205) * (100 - this.bodyfat)) / 100)) *
            this.activityMultiplier;
    },
    getTDEE() {
      return this.units === 'metric'
        ? this.sex === 'male'
          ? Math.round(
              (this.weight.metric * 10 +
                6.25 * this.height.metric -
                5 * this.age +
                5) *
                this.activityMultiplier
            )
          : Math.round(
              (this.weight.metric * 10 +
                6.25 * this.height.metric -
                5 * this.age -
                161) *
                this.activityMultiplier
            )
        : this.sex === 'male'
        ? Math.round(
            (4.536 * Number.parseInt(this.weight.imperial) +
              15.88 *
                (Number.parseInt(this.height.imperial.feet) * 12 +
                  Number.parseInt(this.height.imperial.inches)) -
              5 * Number.parseInt(this.age) +
              5) *
              this.activityMultiplier
          )
        : Math.round(
            (4.536 * Number.parseInt(this.weight.imperial) +
              15.88 *
                (Number.parseInt(this.height.imperial.feet) * 12 +
                  Number.parseInt(this.height.imperial.inches)) -
              5 * Number.parseInt(this.age) -
              161) *
              this.activityMultiplier
          );
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 50px;
}

.age {
  width: 83px;
}

.multiplier {
  width: 63px;
}

.weight {
  width: 103px;
}

.height {
  width: 100px;
}

.activitySpan {
  color: #363636;
  cursor: pointer;
  font-weight: 600;
}

.activityInfo {
  text-transform: lowercase;
}
</style>
