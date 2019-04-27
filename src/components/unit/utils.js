function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const UNIT_TYPES = {
    soldier: {
        type: 'soldier',
        name: 'American Soldier',
        health: 10,
        force: 3,
        currentHealth: 10
    },
    sherman: {
        type: 'sherman',
        name: 'Sherman Tank',
        health: 12,
        force: 5,
        currentHealth: 12
    }
};


export function generateArmy( id, number ) {
    const army = [];
    for(let i =0; i< number; i++) {
        const keys = Object.keys(UNIT_TYPES),
            randomTypeKey =  keys[getRandomInt(0,keys.length-1)],
            unit = Object.assign({}, UNIT_TYPES[randomTypeKey]);

            unit.army = id;

        army.push(unit);
    }

    return army;
}

export function deployTroops( board, army, first ) {
    army.forEach((unit) => {
        let deployed = false;

        while (!deployed) {
            const tile =  board[getRandomInt(first ? 0 : board.length / 2, first ? board.lenth/2 : board.length-1)];
            if (tile!=null && !tile.unit) {
                tile.unit = unit;
                deployed = true;
            }
        }
    })
}