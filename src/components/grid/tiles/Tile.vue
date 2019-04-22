<template>
    <g @mouseover="mouseOver"
       @mouseleave="mouseleave"
       >
        <polygon :class="this.class"
                :points="getPoints(column)" 
                :fill="'url(#' + column.type.name + ')'">
        </polygon>
    </g>
</template>

<script>

export default {
    name: 'TerrainGrid',
    props: {
        column: Object
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
      }
    }
}
</script>

<style scoped>
    .mouse-over {
        opacity: 0.7;
    }
</style>

