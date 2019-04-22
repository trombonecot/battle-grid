<template>
    <svg :width=width :height=height :x=columns :y=rows>
       <svg v-for="(row, indexY) in getRows()"
            v-bind:key="row.y"
            :width=width 
            :height=tileSize 
            :y=indexY*(tileSize-10)>
         
            <svg
                v-for="(column, indexX) in row"
                v-bind:key="indexX"
                :height=tileSize
                :width=tileSize
                :x="getX(indexX, column)">

                    <Tile   :column=column 
                            @unitSelected="unitSelected(column)"
                            :isMovement=!!column.possibleMovement></Tile>
            </svg>

       </svg>

       <defs>
           <pattern id="plains" patternUnits="userSpaceOnUse" width="100" height="100">
               <image xlink:href="../../assets/terrain/plains.jpg" x="0" y="-20" width="100" height="100"/>
           </pattern>
           <pattern id="woods" patternUnits="userSpaceOnUse" width="100" height="100">
               <image xlink:href="../../assets/terrain/woods.jpg" x="0" y="-20" width="100" height="100"/>
           </pattern>
           <pattern id="mountain" patternUnits="userSpaceOnUse" width="100" height="100">
               <image xlink:href="../../assets/terrain/mountains.jpg" x="0" y="-20" width="100" height="100"/>
           </pattern>
           <pattern id="lake" patternUnits="userSpaceOnUse" width="100" height="100">
               <image xlink:href="../../assets/terrain/lake.jpg" x="0" y="-20" width="100" height="100"/>
           </pattern>
            <pattern id="soldier" patternUnits="userSpaceOnUse" width="80" height="80">
               <image xlink:href="../../assets/army/american/soldier.png" x="-20" y="0" width="80" height="80"/>
           </pattern>
       </defs>
    </svg>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('board');
import Tile from './tiles/Tile';

export default {
    name: 'TerrainGrid',
    components: {
        Tile
    },
    props: {
        width: String,
        height: String,
        rows: String,
        columns: String,
        tileSize: String
    },
    computed: {
      ...mapState({
				game: state => state
			}),
    },
    methods: {
      getRows() {
        const all = this.game.board;

        let rows = [];

        for ( let i = 0; i < this.columns; i++ ) {
          rows.push(all.slice(i*this.rows,(i+1)*this.rows));
        }

        return rows;
      },
      getX(index, column) {
        let x = index * (this.tileSize-4);
        if (column.y%2 === 1 ) {
          x += ((this.tileSize-4)/2);
        }
        return x;
      },
        unitSelected(column) {
          this.$emit("unitSelected", column);
      },
	}
}
</script>