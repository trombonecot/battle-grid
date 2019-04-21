
function createBoard(width, height) {
	let board = [], i = 0, j = 0;

	while ( i < width) {
		let line = [];

		while ( j < height ) {
			line.push({discovered: false, ship: false});
			j++;
		}
		board.push(line);
		j = 0;
		i++
	}
	return board;
}

export function generate(width, height, numShips) {
	let board = createBoard(width, height);
	return board;
}