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
	if (!model.state.board.create) return;
	boardView.render(model.state.board);
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
	model.savePlayerInputs(data);

	if (!model.state.players.set) return;
	modalView.render();
	// add players names and avartars
	// gameView.update();
};
const init = () => {
	modalView.modalInputHandler(controlCreateBoard);
	discView.discClickHandler(controlDiscClick);
	gameView.gameStartHandler(controlGameStart);
	playerView.playerInputHandler(controlPlayerInput);
};
init();
