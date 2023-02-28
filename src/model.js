const state = {
	board: {
		width: 6,
		height: 7,

		pieces: "circle",
		theme: "purple",
	},
	game: {
		start: false,
		turn: "home",
		status: {
			winner: "home",
			loser: "away",
			draw: null,
		},
	},
	players: {
		side: ["home", "away"],
		name: {
			home: "bola",
			away: "titi",
		},
		avatar: {
			home: "ba",
			away: "tit",
		},
		color: {
			homeColor: "blue",
			awayColor: "green",
		},
	},
	history: {
		home: 6,
		away: 7,
		draw: 2,
	},
};
const saveBoardInputs = data => {
	state.board = data;
};
// const updateBoardState = data => {};
export { state, saveBoardInputs };
