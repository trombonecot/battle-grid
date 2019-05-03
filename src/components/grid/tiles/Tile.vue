<template>
    <g>
        <polygon 
                v-on:click="selectedTile"
                :class=" this.isMovement ? 'pos-mov' : 'tile'"
                :points="getPoints(column)" 
                :fill="'url(#' + column.type.name + ')'">

        </polygon>

        <Unit   @unitSelected="selectedUnit"
                v-if="column.unit"
                :unit="column.unit"/>
    </g>
</template>

<script>

import Unit from '../../unit/Unit.vue';

export default {
    name: 'TerrainGrid',
    components: {
        Unit
    },
    props: {
        column: Object,
        unit: Object,
        isMovement: Boolean,
        turn: String
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
      isUnitTurn() {
        return this.turn === this.column.unit.army
      },
      selectedUnit() {
          if (this.isUnitTurn() || this.isMovement) {
            this.$emit("unitSelected", this.column);
          }
      },
      selectedTile() {
          this.$emit("tileSelected", this.column);
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
    .pos-mov {
        opacity: 0.5;
    }
    .tile {
        opacity: 0.8;
    }
</style>

