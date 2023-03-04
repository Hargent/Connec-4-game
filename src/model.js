const state = {
	game: {
		data: {
			create: false,
			dimensions: [6, 7],
			labels: [],
			winningCombos: [],
			pieces: "circle",
			theme: "purple",
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
			name: "home",
			avatar: "HM",
			color: "blue",
			inputs: [],
		},
		away: {
			name: "away",
			avatar: "AY",
			color: "green",
			inputs: [],
		},
	},
};
const saveBoardInputs = data => {
	state.board.width = data.width;
	state.board.height = data.height;
	state.board.create = data.create;
};
const savePlayerInputs = data => {
	(state.players.name = {
		home: data.home,
		away: data.away,
	}),
		(state.players.color = {
			homeColor: data.homeColor,
			awayColor: data.awayColor,
		}),
		(state.players.set = data.set);
};

//

// ////////!SECTION
// /**
//  *
//  * @param {[Number[]]} arr main array
//  * @param {Number[]} chk array to find in the main array
//  * @returns True if chk is in arr and false otherwise
//  */
// const isCOntains = (arr, chk) => {
// 	return arr.some(ar => {
// 		if (
// 			Array.isArray(ar) &&
// 			Array.isArray(chk) &&
// 			ar.length === chk.length
// 		) {
// 			let isTrue = [];
// 			for (let i = 0; i < ar.length; i++) {
// 				isTrue.push(ar[i] === chk[i]);
// 			}

// 			return isTrue.every(el => el === true);
// 		}
// 		return false;
// 	});
// };
// /**
//  * Adds new point to the Array of clicked points
//  * @param {Number[]} target 2D coords of point to be saved
//  * @returns Void Only when the target already exist in the main array
//  */
// const saveInputs = target => {
// 	const isSaved = state.player.homeTurn
// 		? isCOntains(state.player.home.inputs, target)
// 		: isCOntains(state.player.away.inputs, target);

// 	if (isSaved) {
// 		state.player.homeTurn = state.player.homeTurn;
// 		return;
// 	}
// 	if (state.player.homeWin !== null) return;
// 	state.player.homeTurn = !state.player.homeTurn;

// 	state.player.homeTurn
// 		? state.player.home.inputs.push(target)
// 		: state.player.away.inputs.push(target);
// };
// /**
//  *
//  * @returns True if a winning combination is found and false otherwise
//  */
// const checkWin = () => {
// 	const target = state.player.homeTurn
// 		? state.player.home.inputs
// 		: state.player.away.inputs;

// 	return state.game.data.winningCombos.some(combination => {
// 		return combination.every(index => {
// 			return isCOntains(target, index);
// 		});
// 	});
// };
// /**
//  *
//  * @returns True if no winning combo is found and there are no more room for clicks i.e Game Over
//  */
// const checkDraw = () => {
// 	return (
// 		state.player.home.inputs.length + state.player.away.inputs.length ===
// 		state.game.data.dimensions.reduce((st, el) => st * el)
// 	);
// };
// /**
//  * Swaps turns between the two players as well as checking for a win or a draw scenario
//  * @returns Void only when the game ends and there and no more turns
//  */
// const gameStatus = () => {
// 	let currentPlayer;
// 	if (state.player.homeTurn === null) return;
// 	state.player.homeTurn
// 		? (currentPlayer = state.player.away.name)
// 		: (currentPlayer = state.player.home.name);

// 	if (checkWin()) {
// 		state.player.homeWin = currentPlayer;
// 		state.player.homeTurn = null;
// 		state.game.isEnd = true;
// 	} else if (checkDraw()) {
// 		state.player.homeWin = "draw";
// 		state.player.homeTurn = null;
// 		state.game.isEnd = true;
// 		state.game.isDraw = true;
// 	}
// };
// /**
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
export { state, saveBoardInputs, savePlayerInputs };
