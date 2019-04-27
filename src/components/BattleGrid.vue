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
                @tileSelected="tileSelected"
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
import { generateArmy, deployTroops } from './unit/utils.js';
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

      const armyA = generateArmy('a', 5),
        armyB = generateArmy('b', 5),
        tiles = generateTiles(Grid.rectangle({ width: 10, height: 10 }));

      deployTroops(tiles, armyA, true);
      deployTroops(tiles, armyB, false);
      
      const model = {
        board: tiles
      };

      next(vm => {
        vm.set(model);
      });
    },
    methods: {
      set: boardStore.mapMutations(['set']).set,
      setMovement: boardStore.mapMutations(['setMovement']).setMovement,
      cleanMovements: boardStore.mapMutations(['cleanMovements']).cleanMovements,
      move: boardStore.mapMutations(['move']).move,
      attack: boardStore.mapMutations(['attack']).attack,
      unitSelected(tile) {
        if ( !tile.possibleMovement ) {
          this.set({selected: tile});
          this.cleanMovements();
          selectMovements(this.game.board, this.game.selected).forEach(element => {
              this.setMovement(element);
            });
        } else {
          this.tileSelected(tile);
        }
      },
      tileSelected(tile) {
        const originTile = this.game.selected;

        this.set({selected: null});
        if (tile.possibleMovement) {
          if ( !tile.unit ) {
            this.move({o: originTile,d: tile});
          } else if (originTile.unit.army != tile.unit.army) {
            this.attack({o: originTile,d: tile});
          }
        }
        this.cleanMovements();

      },
      carryAction(action) {
        this.set({action: action})
      }
		}
}
</script>
