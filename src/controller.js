//SECTION - IMPORTS

import * as model from "./model";

import core from "core-js";
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

/**
 * Updates the game data  used by the Views
 */
const updateData = () => {
	const gameData = model.generateGameData();
	playerView._getPlayerData(gameData.players);
	gameView._getGameData(gameData.game);
};

const AIGameControl = () => {
	gameView.renderStart();
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
};
const controlGamePlay = target => {
	model.saveInputs(target);
	model.gameStatus();

	if (model.state.game.isEnd) {
		console.log("End-Game");
	}
	updateData();
};
// /**
//  * Controls the hover event response during game
//  * @param {Number[]} target
//  */
// const controlGameHoverON = target => {
// 	playerView.setBoardHoverClass(target);
// };
// /**
//  * Controls the hover removal event response during game
//  * @param {Number[]} target
//  */
// const controlGameHoverOUT = target => {
// 	playerView.removeBoardHoverClass(target);
// };

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
