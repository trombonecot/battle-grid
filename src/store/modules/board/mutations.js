export default {
	set(state, payload) {
		Object.assign(state, payload);
	},
	setMovement(state, neighbor) {
		state.board[(neighbor.x)+(neighbor.y*10)].possibleMovement = true;
	}
};