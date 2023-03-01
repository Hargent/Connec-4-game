const state = {
	board: {
		create: false,
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
		set: false,
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
// const updateBoardState = data => {};
export { state, saveBoardInputs, savePlayerInputs };
