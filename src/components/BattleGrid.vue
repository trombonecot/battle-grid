<template>
  <div class="hello">
    <h1>Battle Grid</h1>

    <TerrainGrid 
                width=800 
                height=600 
                rows=10 
                columns=10
                tileSize=64></TerrainGrid>

  </div>
</template>

<script>
import { defineGrid, extendHex } from 'honeycomb-grid';
import { createNamespacedHelpers } from 'vuex';

import { generateTiles } from './grid/tiles/index.js';
import TerrainGrid from './grid/TerrainGrid';

const { mapState } = createNamespacedHelpers('board');
const boardStore = createNamespacedHelpers('board');


export default {
    name: 'BattleGrid',
    components: {
      TerrainGrid
    },
    computed: {
      ...mapState({
				game: state => state
			}),
    },
    beforeRouteEnter(to, from, next) {
      const Hex = extendHex({ size: 32 });
      const Grid = defineGrid(Hex);

      const model = {
        board: generateTiles(Grid.rectangle({ width: 10, height: 10 }))
      }

      next(vm => {
        vm.set(model);
      });
    },
    methods: {
      set: boardStore.mapMutations(['set']).set
		}
}
</script>
