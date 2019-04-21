<template>
  <div class="hello">
    <h1>Battle Grid</h1>

    <svg width=400 height=400 x=4 y=4>
       <svg v-for="row in getRows()" width=400 height=48 y=0>
         
                    <svg
                      v-for="column in row"
                      height=48
                      width=48
                      x=0
                    >

                         <g>
                            <polygon :points="getPoints(column)"></polygon>
                        </g>
                    </svg>


       </svg>
    </svg>

  </div>
</template>

<script>
import { defineGrid, extendHex } from 'honeycomb-grid';
import { createNamespacedHelpers } from 'vuex';

const { mapMutations, mapState } = createNamespacedHelpers('board');
const boardStore = createNamespacedHelpers('board');

export default {
    name: 'BattleGrid',
    computed: {
      ...mapState({
				game: state => state
			}),
    },
    beforeRouteEnter(to, from, next) {
      const Hex = extendHex({ size: 24 });
      const Grid = defineGrid(Hex);

      const model = {
        board: Grid.rectangle({ width: 4, height: 4 })
      }

      next(vm => {
        vm.set(model);
      });
    },
    methods: {
      set: boardStore.mapMutations(['set']).set,
      getRows() {
        const all = this.game.board;

        let rows = [];

        for ( let i = 0; i < 4; i++ ) {
          rows.push(all.slice(i*4,(i+1)*4));
        }

        return rows;
      },
      getPoints(tile) {
            var total = 6;
            console.log(tile.corners());
            return tile.corners().map((corner) => {
                return corner.x + ',' + corner.y
            }).join(' ');
      }
		}
}
</script>
