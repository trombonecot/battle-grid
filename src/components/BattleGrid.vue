<template>
  <div class="hello">
    <h1>Battle Grid</h1>

    <TerrainGrid 
                width=800 
                height=600 
                rows=10 
                columns=10
                tileSize=64
                @unitSelected="unitSelected"
                ></TerrainGrid>
    
    <ActionPanel v-if="isUnitSelected" 
                  :tile=game.selected
                  @carryAction="carryAction"></ActionPanel>

  </div>
</template>

<script>
import { defineGrid, extendHex } from 'honeycomb-grid';
import { createNamespacedHelpers } from 'vuex';

import { generateTiles, selectMovements } from './grid/tiles/index.js';
import TerrainGrid from './grid/TerrainGrid';
import ActionPanel from './actionPanel/index.vue';

const { mapState } = createNamespacedHelpers('board');
const boardStore = createNamespacedHelpers('board');


export default {
    name: 'BattleGrid',
    components: {
      TerrainGrid,
      ActionPanel
    },
    computed: {
      ...mapState({
				game: state => state
      }),
      isUnitSelected() {
        return !!this.game.selected;
      }
    },
    beforeRouteEnter(to, from, next) {
      const Hex = extendHex({ size: 32 });
      const Grid = defineGrid(Hex);

      const army1 = {
        units: [
          {
            type: 'soldier',
            position: { x: 2, y: 3 }
          }
        ]
      }
      
      const model = {
        board: generateTiles(Grid.rectangle({ width: 10, height: 10 })),
        armyA : army1
      }

      next(vm => {
        vm.set(model);
      });
    },
    methods: {
      set: boardStore.mapMutations(['set']).set,
      setMovement: boardStore.mapMutations(['setMovement']).setMovement,
      cleanMovements: boardStore.mapMutations(['cleanMovements']).cleanMovements,
      unitSelected(tile) {
        this.set({selected: tile});
        this.cleanMovements();
        selectMovements(this.game.board, this.game.selected).forEach(element => {
            this.setMovement(element);
          });
      },
      carryAction(action) {
        this.set({action: action})
      }
		}
}
</script>
