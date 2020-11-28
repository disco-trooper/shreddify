<template>
  <div>
    <div class="box">
      <h1 class="has-text-centered title">
        <b-tooltip
          label=""
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalKcal: 2000,
      protein: {
        amount: 40,
        percentage: true,
      },
      carbs: {
        amount: 40,
        percentage: true,
      },
      fat: {
        amount: 20,
        percentage: false,
      },
      macros: {
        protein: undefined,
        carbs: undefined,
        fat: undefined,
      },
    };
  },
  methods: {
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
