<template>
  <div class="hello">
    <h1>Battle Grid</h1>

    <div>TURN: {{game.turn}}</div>

    <button @click="autoResolve">Auto move</button>

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

    <BattleLog></BattleLog>

  </div>
</template>

<script>
import { defineGrid, extendHex } from 'honeycomb-grid';
import { createNamespacedHelpers } from 'vuex';

import { generateTiles } from './grid/tiles/index.js';
import { getPossibleMovements } from './grid/utils';
import { generateArmy, deployTroops } from './unit/utils.js';
import TerrainGrid from './grid/TerrainGrid';
import ActionPanel from './actionPanel/index.vue';
import BattleLog from './BattleLog.vue';
import { autoResolve } from './ai/index.js';

const { mapState } = createNamespacedHelpers('board');
const boardStore = createNamespacedHelpers('board');


export default {
    name: 'BattleGrid',
    components: {
      TerrainGrid,
      ActionPanel,
      BattleLog
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
      changeTurn: boardStore.mapMutations(['changeTurn']).changeTurn,
      unitSelected(tile) {
        if ( !tile.possibleMovement ) {
          this.set({selected: tile});
          this.cleanMovements();
          getPossibleMovements(this.game.selected).forEach(element => {
              this.setMovement(element);
            });
        } else {
          this.tileSelected(tile);
        }
      },
      tileSelected(tile) {
        const originTile = this.game.selected;

        this.moveOrAttack(originTile, tile);
      },
      carryAction(action) {
        this.set({action: action})
      },
      autoResolve() {
        const {tileOrigin, tileEnd} = autoResolve(this.game.board, this.game.turn);
        
        this.moveOrAttack(tileOrigin, tileEnd);
      },
      moveOrAttack(tileA, tileB) {
        this.set({selected: null});
          if ( !tileB.unit ) {
            this.move({o: tileA,d: tileB});
            this.changeTurn();
          } else if (tileA.unit.army != tileB.unit.army) {
            this.attack({o: tileA,d: tileB});
            this.changeTurn();
          }
        this.cleanMovements();
      }
		}
}
</script>
