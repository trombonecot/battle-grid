import { Y } from '@/components/grid/constants';
import { getRandomInt } from '@/components/utils';
import { extendHex, defineGrid } from 'honeycomb-grid';
import { getPossibleMovements } from '@/components/grid/utils';

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

export function autoResolve(board, armyId) {
	const aggresiveness = getRandomInt(0, 10);


		const mostAwayUnit = getMostAwayUnit(board, armyId),
			selectedTiles = getPossibleMovements(mostAwayUnit);

		let movement = selectedTiles[getRandomInt(0, selectedTiles.length-1)];

		// TODO: BUG
		const keyOrigen =(mostAwayUnit.x)+(mostAwayUnit.y*Y),
			keyEnd =(movement.x)+(movement.y*Y);

	return {
		tileOrigin: board[keyOrigen],
		tileEnd: board[keyEnd]
	};
}