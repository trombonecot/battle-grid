import Vue from 'vue';
import {Y} from '@/components/grid/constants';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function move(state, payload) {
	const originTile = payload.o,
	tile = payload.d,
	originTileKey =(originTile.x)+(originTile.y*Y),
	tileKey =(tile.x)+(tile.y*Y),
	unit = originTile.unit;

	Vue.set(state.board[originTileKey], 'unit', null);
	Vue.set(state.board[tileKey], 'unit', unit);
}

function resolveAttack(a, b) {
	let atacA = getRandomInt(1, 5),
		atacB = getRandomInt(1, 5);

		// TODO: resolve terrains, etc...
		if ( atacA+a.force-a.currentHealth > atacB+b.force-b.currentHealth) {
			atacA += 1;
		} else {
			atacB += 1;
		}
	
		a.currentHealth -= atacB;
		b.currentHealth -= atacA;

		return {
			originUnit: a.currentHealth > 0 ? a : null, 
			destUnit: b.currentHealth > 0 ? b : null
		};

}

export default {
	set(state, payload) {
		Object.assign(state, payload);
	},
	setMovement(state, neighbor) {
		const key =(neighbor.x)+(neighbor.y*Y);
		if (state.board[key].type.difficulty !== -1 ) {
			Vue.set(state.board[key], 'possibleMovement', true);
		}
	},
	cleanMovements(state) {
		state.board.forEach(element => {
			Vue.set(element, 'possibleMovement', false);
		});
	},
	move(state, payload) {
		move(state, payload);
	},
	attack(state, payload) {
		const originTile = payload.o,
			tile = payload.d,
			originTileKey =(originTile.x)+(originTile.y*Y),
			tileKey =(tile.x)+(tile.y*Y);

		const {originUnit, destUnit} =  resolveAttack(originTile.unit, tile.unit);

		debugger
		if ( !destUnit && originUnit ) {
			move(state, payload);
		} else {
			Vue.set(state.board[originTileKey], 'unit', originUnit);
			Vue.set(state.board[tileKey], 'unit', destUnit);
		}
	}
};