import { extendHex, defineGrid } from 'honeycomb-grid';
import { X, Y } from '@/components/grid/constants';

export function getPossibleMovements(selected) {
    const Hex = extendHex({ orientation: 'pointy' })
    const Grid = defineGrid(Hex);

    const grid = Grid.rectangle({ width: X, height: Y }),
        hex = grid.get([selected.x, selected.y]);

    return grid.neighborsOf(hex);
}