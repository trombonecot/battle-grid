<template>
    <div class="tile" :id="this.getId()">
        <svg xmlns="http://www.w3.org/2000/svg"
            height="48"
            width="48"
            viewBox="0 0 48 48"
            role="presentation"
  >
            <g>
                <polygon :points="this.points()"></polygon>
            </g>
        </svg>
    </div>

</template>

<script>

export default {
    name: 'DrawSVG',
    props: {
      tile: Object,
      corners: Array
    },
    methods: {
        getId() {
            return 'tile_' + this.tile.x + this.tile.y;
        },
        points() {
            var total = 6;
            return this.corners.map(function (corner) {
                return corner.x + ',' + corner.y
            }).join(' ')
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tile {
    width: 48px;
    height: 48px;
    background:red;
    float:left;
    margin: 1px;
  }
</style>
