import Vue from 'vue';
import {X, Y} from '@/components/grid/constants';

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
	}
};