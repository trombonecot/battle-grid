<template>
    <svg>
        <circle   cx="45" cy="20" r="3" :fill="this.getColorArmy()">
            <title>{{unit.name}} ({{unit.currentHealth}}/{{unit.health}})</title>
         </circle>
         <circle    @mouseover="mouseOver"
                    @mouseleave="mouseleave"
                    v-on:click="selectedUnit"
                    :class="this.class"
                    cx="28" cy="32" r="20"  :fill="'url(#' + unit.type + ')'">
            <title>{{unit.name}} ({{unit.currentHealth}}/{{unit.health}})</title>
         </circle>
         <Health :unit="unit" />
    </svg>
</template>

<script>

import Health from './Health.vue';

export default {
    name: 'Unit',
    components: {
        Health
    },
    props: {
        unit: Object
    },
    data() {
        return {
            class: ''
        };
    },
    methods: {
      getPoints(tile) {
            return tile.corners().map((corner) => {
                return corner.x + ',' + corner.y
            }).join(' ');
      },
      mouseOver() {
          this.class += 'mouse-over';
          
      },
      mouseleave() {
          this.class = '';
      },
      selectedUnit() {
          this.$emit("unitSelected", this.unit);
      },
      getColorArmy() {
          return this.unit.army =='a' ? 'blue' : 'red';
      },
      getHealthColor(unit) {
          const ratio = unit.currentHealth/unit.health;
          if ( ratio < 0.3 ) {
              return "red";
          } else if ( ratio < 0.5 ) {
              return "orange";
          } else if ( ratio < 0.7 ) {
              return "yellow";
          } else {
              return "lightGreen"
          }
      }
    }
}
</script>

<style scoped>
    .mouse-over {
        opacity: 0.7;
    }
</style>

