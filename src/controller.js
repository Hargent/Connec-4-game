//SECTION - IMPORTS

import * as model from "./model";

import boardView from "./Views/boardView/boardView";
import core from "core-js";
import gameAlgo from "./Views/gameAlgo";
import gameView from "./Views/gameView";
import playerView from "./Views/playerView";
import runtime from "regenerator-runtime";

// import discView from "./Views/boardView/discView";

// import modalView from "./Views/boardView/modalView";

const AIGameControl = () => {
	gameView.renderStart();
};

const controlGameStart = data => {
	if (!data) return;
	playerView.render();
};
const controlPlayerInput = data => {
	model.savePlayerDetails(data);

	gameView.renderModal();

	// gameView.update();
};
const controlCreateBoard = data => {
	// generate labels and combos
	const algoData = gameAlgo._gameAlgo([data.width, data.height]);
	data.algoData = algoData;

	model.saveBoardDetails(data);
	const gameData = model.generateGameData();

	gameView.renderBoard(gameData.game);
};
const controlDiscClick = target => {
	// console.log(target);
};
// /**
//  * Generates the Game Data from the State storage in the model module
//  */
// const generateGameData = () => {
// 	const dimensions = model.state.game.data.dimensions;
// 	const gameData = gameAlgo._gameAlgo(dimensions);
// 	model.state.game.data.labels = gameData[0];
// 	model.state.game.data.winningCombos = gameData[1];

// 	playerView._getPlayerData(model.state.player);
// 	gameView._getGameData(model.state);
// };
// /**
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
	// discView.discClickHandler(controlDiscClick);
	gameView.gameStartHandler(controlGameStart);
	playerView.playerInputHandler(controlPlayerInput);
};
init();

// function that swap cyurrent playrer
// function that places color
