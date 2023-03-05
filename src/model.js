const state = {
	game: {
		data: {
			create: false,
			dimensions: [6, 7],
			labels: [],
			combos: [],
			pieces: "",
			theme: "",
		},
		isStart: false,
		isDraw: false,
		isEnd: false,
		history: {
			home: 6,
			away: 7,
			draw: 2,
		},
	},
	players: {
		set: false,
		homeTurn: false,
		homeWin: null,
		home: {
			id: "home",
			name: "",
			avatar: "HM",
			color: "blue",
			inputs: [],
		},
		away: {
			id: "away",
			name: "",
			avatar: "AY",
			color: "green",
			inputs: [],
		},
	},
};
const savePlayerDetails = data => {
	if (state.players.set) {
		throw new Error(`***Players' details already set***`);
	}
	try {
		state.players.home.name = data.home;
		state.players.home.color = data.homeColor;
		state.players.away.name = data.away;
		state.players.away.color = data.awayColor;
		state.players.set = !state.players.set;
	} catch (err) {
		throw new Error(`****${err.message}****`);
	}
};
const saveBoardDetails = data => {
	if (state.game.data.create) {
		throw new Error(`***Game details already Generated***`);
	}
	const gameState = state.game.data;
	(gameState.dimensions = [data.width, data.height]),
		(gameState.labels = data.algoData[0]),
		(gameState.combos = data.algoData[1]),
		(gameState.pieces = data.pieces),
		(gameState.create = !gameState.create);

	if (gameState.create) {
		state.game.isStart = !state.game.isStart;
	}
};
const generateGameData = () => {
	if (!state.game.isStart) return;
	const playerData = state.players;
	const gameData = state.game;
	return {
		game: gameData,
		players: playerData,
	};
};

/**
 *
 * @param {[Number[]]} arr main array
 * @param {Number[]} chk array to find in the main array
 * @returns True if chk is in arr and false otherwise
 */
const isCOntains = (arr, chk) => {
	return arr.some(ar => {
		if (
			Array.isArray(ar) &&
			Array.isArray(chk) &&
			ar.length === chk.length
		) {
			let isTrue = [];
			for (let i = 0; i < ar.length; i++) {
				isTrue.push(ar[i] === chk[i]);
			}
			if (isTrue.every(el => el === true)) console.log(arr);
			return isTrue.every(el => el === true);
		}
		return false;
	});
};
/**
 * Adds new point to the Array of clicked points
 * @param {Number[]} target 2D coords of point to be saved
 * @returns Void Only when the target already exist in the main array
 */
const saveInputs = target => {
	const isSaved = state.players.homeTurn
		? isCOntains(state.players.home.inputs, target)
		: isCOntains(state.players.away.inputs, target);

	if (isSaved) {
		state.players.homeTurn = state.players.homeTurn;
		return;
	}
	if (state.players.homeWin !== null) return;
	state.players.homeTurn = !state.players.homeTurn;

	state.players.homeTurn
		? state.players.home.inputs.push(target)
		: state.players.away.inputs.push(target);
};
/**
 *
 * @returns True if a winning combination is found and false otherwise
 */
const checkWin = () => {
	const target = state.players.homeTurn
		? state.players.home.inputs
		: state.players.away.inputs;

	console.log(state.game.data.combos);
	return state.game.data.combos.some(combination => {
		return combination.every(index => {
			return isCOntains(target, index);
		});
	});
};
/**
 *
 * @returns True if no winning combo is found and there are no more room for clicks i.e Game Over
 */
const checkDraw = () => {
	return (
		state.players.home.inputs.length + state.players.away.inputs.length ===
		state.game.data.dimensions.reduce((st, el) => st * el)
	);
};
/**
 * Swaps turns between the two players as well as checking for a win or a draw scenario
 * @returns Void only when the game ends and there and no more turns
 */
const gameStatus = () => {
	let currentPlayer;
	if (state.players.homeTurn === null) return;
	state.players.homeTurn
		? (currentPlayer = state.players.away.name)
		: (currentPlayer = state.players.home.name);

	if (checkWin()) {
		console.log("win");
		state.players.homeWin = currentPlayer;
		state.players.homeTurn = null;
		state.game.isEnd = true;
	} else if (checkDraw()) {
		console.log("draw");
		state.players.homeWin = "draw";
		state.players.homeTurn = null;
		state.game.isEnd = true;
		state.game.isDraw = true;
	}
	console.log("keep playing");
};
/**
//  * Resets the game state to the initial state
//  */
// const restartGame = () => {
// 	state.game = {
// 		data: {
// 			dimensions: [3, 3],
// 			labels: [],
// 			winningCombos: [],
// 		},
// 		isEnd: false,
// 		isDraw: false,
// 	};
// 	state.player = {
// 		homeWin: null,
// 		homeTurn: false,
// 		home: {
// 			name: "circle",
// 			inputs: [],
// 		},
// 		away: {
// 			name: "x",
// 			inputs: [],
// 		},
// 	};
// };
// const updateBoardState = data => {};
export {
	state,
	savePlayerDetails,
	saveBoardDetails,
	generateGameData,
	saveInputs,
	gameStatus,
};
