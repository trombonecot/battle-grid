import Vue from 'vue';
import {Y} from '@/components/grid/constants';
import { getRandomInt } from '@/components/utils';

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
	let attack = getRandomInt(1, a.atac),
		defense = getRandomInt(1, b.defense);

		let msg = `Atac:`;

		if ( attack > defense ) {
			const force = getRandomInt(1, a.force);
			msg += `${a.name}(${a.army}) attacks ${b.name}(${b.army}) and does ${force}`;
			b.currentHealth -= force;
		} else {
			const force = getRandomInt(1, b.force);
			msg += `${b.name}(${b.army}) defences from ${a.name}(${a.army}) and does ${force}`;
			a.currentHealth -= force;
		}
		
		return {
			originUnit: a.currentHealth > 0 ? a : null, 
			destUnit: b.currentHealth > 0 ? b : null,
			msg: msg
		};
}

export default {
	set(state, payload) {
		Object.assign(state, payload);
	},
	changeTurn(state) {
		state.turn = state.turn === 'a' ? 'b' : 'a';
	},
	addLogEntry(state, msg) {
		state.log.push(msg);

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

		const {originUnit, destUnit, msg} =  resolveAttack(originTile.unit, tile.unit);

		state.log.push(msg);

		if ( !destUnit && originUnit ) {
			move(state, payload);
		} else {
			Vue.set(state.board[originTileKey], 'unit', originUnit);
			Vue.set(state.board[tileKey], 'unit', destUnit);
		}
	}
};