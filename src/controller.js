//SECTION - IMPORTS

import * as model from "./model";

import boardView from "./Views/boardView/boardView";
import core from "core-js";
import discView from "./Views/boardView/discView";
import gameView from "./Views/gameView";
import modalView from "./Views/boardView/modalView";
import playerView from "./Views/playerView";
import runtime from "regenerator-runtime";

const controlCreateBoard = data => {
	console.log(data);

	model.saveBoardInputs(data);
	if (!model.state.board.create) return;
	boardView.render(model.state.board);
};
const controlDiscClick = target => {
	// console.log(target);
};
const controlGameStart = data => {
	model.state.game.start = data;
	if (!model.state.game.start) return;
	// gameView.render();
	playerView.render();
};
const controlPlayerInput = data => {
	model.savePlayerInputs(data);

	if (!model.state.players.set) return;
	modalView.render();
	// add players names and avartars
	// gameView.update();
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
	modalView.modalInputHandler(controlCreateBoard);
	discView.discClickHandler(controlDiscClick);
	gameView.gameStartHandler(controlGameStart);
	playerView.playerInputHandler(controlPlayerInput);
};
init();

// function that swap cyurrent playrer
// function that places color
