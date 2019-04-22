<template>
    <g>
        <polygon 
                :class=" this.isMovement ? 'pos-mov' : ''"
                :points="getPoints(column)" 
                :fill="'url(#' + column.type.name + ')'">

        </polygon>

         <circle    @mouseover="mouseOver"
                    @mouseleave="mouseleave"
                    v-on:click="selectedUnit"
                    :class="this.class"
                    v-if="!!column.unit" cx="28" cy="32" r="20" stroke-width="3" :stroke="this.getHealthColor(column.unit)" :fill="'url(#' + column.unit.type + ')'">
            <title>{{column.unit.name}} ({{column.unit.currentHealth}}/{{column.unit.health}})</title>
         </circle>
    </g>
</template>

<script>

export default {
    name: 'TerrainGrid',
    props: {
        column: Object,
        unit: Object,
        isMovement: Boolean
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
          this.$emit("unitSelected", this.column);
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
    .pos-mov {
        opacity: 0.7;
    }
</style>

