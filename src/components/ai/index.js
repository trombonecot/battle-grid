import {Y} from '@/components/grid/constants';


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMostAwayUnit(board, armyId) {
	let selectedTile = null;

	board.forEach((tile) => {
		if (!!tile.unit && tile.unit.army === armyId && armyId === 'a') {
			selectedTile = tile;
		} else if ( !!tile.unit && tile.unit.army === armyId && armyId === 'b' && !selectedTile) {		
			selectedTile = tile;
		}
	});

	return selectedTile;

}

import { extendHex, defineGrid } from 'honeycomb-grid';

export function selectMovements(tile) {
    const Hex = extendHex({ orientation: 'pointy' })
    const Grid = defineGrid(Hex);

    const grid = Grid.rectangle({ width: 10, height: 10 }),
        hex = grid.get([tile.x, tile.y]);

    return grid.neighborsOf(hex);
}

export function autoResolve(board, armyId) {
	const aggresiveness = getRandomInt(0, 10);


		const mostAwayUnit = getMostAwayUnit(board, armyId),
			selectedTiles = selectMovements(mostAwayUnit);

		let movement = selectedTiles[getRandomInt(0, selectedTiles.length-1)];

		// TODO: BUG
		const keyOrigen =(mostAwayUnit.x)+(mostAwayUnit.y*Y),
			keyEnd =(movement.x)+(movement.y*Y);

	return {
		tileOrigin: board[keyOrigen],
		tileEnd: board[keyEnd]
	};
}