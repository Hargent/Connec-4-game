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
	const algoData = gameAlgo._gameAlgo([data.width, data.height]);
	data.algoData = algoData;

	model.saveBoardDetails(data);
	generateGameData();

	gameView.renderBoard();
	playerView.renderBoard();
	cursor.init();
	//
	// gameView.renderModal();
};

const controlGamePlay = target => {
	if (!model.state.game.isEnd) {
		model.saveInputs(target);
		playerView.placeMark(target);
		model.gameStatus();
	}
	console.log(model.state.game.isEnd);
	console.log("Game over");
	return;
};

/**
 *
 * @param {boolean} reset
 * @returns Void only if the game is not to be restarted
 */
const controlResetGame = reset => {
	if (!reset) return;
	model.resetGame();

	gameView.renderBoard();
	playerView.renderBoard();
	cursor.init();
};
/**
 *
 * @param {boolean} restart
 * @returns Void only if the game is not to be restarted
 */
const controlRestartGame = restart => {
	if (!restart) return;

	model.restartGame();
	AIGameControl();
};
/**
 * Initialize the Beginning of the game
 */
const init = () => {
	AIGameControl();
	playerView.playerInputHandler(controlGamePlay);
	gameView.gameStartHandler(controlGameStart);
	playerView.playerDetailsHandler(controlPlayerDetails);
	gameView.resetGameHandler(controlResetGame);
	gameView.restartGameHandler(controlRestartGame);
};

init();

// function that swap cyurrent playrer
// function that places color
