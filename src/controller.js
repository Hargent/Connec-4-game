//SECTION - IMPORTS

import * as model from "./model";
import * as model from "./model";

import core from "core-js";
import cursor from "./Views/cursorView";
import gameAlgo from "./Views/gameAlgo";
import gameView from "./Views/gameView";
import playerView from "./Views/playerView";
import runtime from "regenerator-runtime";

/**
 * Generates the Game Data from the State storage in the model module
 */
const generateGameData = () => {
	const gameData = model.generateGameData();

	playerView._getPlayerData(gameData.players);
	gameView._getGameData(gameData.game);
};

// /**
//  * Updates the game data  used by the Views
//  * Updates the game data  used by the Views
//  */
// const updateData = () => {
// 	const gameData = model.generateGameData();
// 	playerView._getPlayerData(gameData.players);
// 	gameView._getGameData(gameData.game);
// };

const AIGameControl = () => {
	gameView.renderStart();
	// cursor.init();
};

const controlGameStart = data => {
	if (!data) return;
	playerView.render();
};
const controlPlayerDetails = data => {
	model.savePlayerDetails(data);

	gameView.renderModal();
};
const controlCreateBoard = data => {
	// generate labels and combos
	const algoData = gameAlgo._gameAlgo([data.width, data.height]);
	data.algoData = algoData;

	model.saveBoardDetails(data);
	generateGameData();

	gameView.renderBoard();
	playerView.renderBoard();
	cursor.init();
	//
};
const controlGamePlay = target => {
	if (!model.state.game.isEnd) {
		model.saveInputs(target);
		playerView.placeMark(target);
		playerView.updateBoard(model.generateGameData().players);
		model.gameStatus();
		console.log(model.state.game.isEnd);
	}
	console.log(model.state.game.isEnd);
	if (model.state.game.isEnd) {
		console.log("Game Over");
		return;
	}
};

/**
//  *
//  * @param {boolean} restart
//  * @returns Void only if the game is not to be restarted
//  */
// const controlRestart = restart => {
// 	if (!restart) return;
// 	model.restartGame();
// 	updateData();
// 	init();
// };
/**
 * Initialize the Beginning of the game
 */
const init = () => {
	AIGameControl();
	gameView.modalInputHandler(controlCreateBoard);
	playerView.playerInputHandler(controlGamePlay);
	gameView.gameStartHandler(controlGameStart);
	playerView.playerDetailsHandler(controlPlayerDetails);
};

init();

// function that swap cyurrent playrer
// function that places color
