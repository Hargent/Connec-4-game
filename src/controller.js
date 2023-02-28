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
	model.saveBoardInputs(data);
	boardView._createBoard(model.state.board);
	const gameData = boardView._generateGameData();
	console.log(gameData);
};
const controlDiscClick = target => {
	// console.log(target);
};
const controlGameStart = data => {
	model.state.game.start = data;
	if (!model.state.game.start) return;
	gameView.render();
	playerView.render();
};
const controlPlayerInput = data => {
	// console.log(data);
};
const init = () => {
	modalView.modalInputHandler(controlCreateBoard);
	discView.discClickHandler(controlDiscClick);
	gameView.gameStartHandler(controlGameStart);
	playerView.playerInputHandler(controlPlayerInput);
};
init();
