function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const types = [
    {
        name: 'plains',
        difficulty: 0,
        frequency: 10,
        protection: 0
    },{
        name: 'woods',
        difficulty: 0,
        frequency: 3,
        protection: 1
    },{
        name: 'lake',
        difficulty: -1,
        frequency: 1,
        protection: 0
    },{
        name: 'mountain',
        difficulty: -1,
        frequency: 2,
        protection: 0
    }
];

export function generateTiles(board) {

    const finalTypes = [];

    types.forEach((type) => {
        let i = 0;
        while (i < type.frequency) {
            finalTypes.push(type);
            i++;
        }
    });

	board.forEach(element => {
        const type = finalTypes[getRandomInt(0, finalTypes.length-1)];
		element.type = type;
	});

	return board;
}