//SECTION - IMPORTS

import imageName from "../../assets/connect4.gif";

class GameView {
	_parentElement = document.querySelector(".game");
	_data;

	_getGameData(data) {
		this._data = data;
	}
	//
	// HANDLERS
	gameStartHandler(handler) {
		this._parentElement.addEventListener("click", e => {
			const playBtn = e.target.closest(".play__now");
			if (!playBtn) return;
			handler(true);
		});
	}

	// RESET GAME
	resetGameHandler(handlerSet) {
		try {
			this._parentElement.addEventListener("click", function (e) {
				const resetBtn = e.target.closest(".reset__game");
				if (!resetBtn) return;
				console.log(resetBtn);

				handlerSet(true);
			});
		} catch (err) {
			console.error(err);
		}
	}
	// RESTART GAME
	restartGameHandler(handlerStart) {
		try {
			this._parentElement.addEventListener("click", function (e) {
				const restartBtn = e.target.closest(".restart__game");
				if (!restartBtn) return;

				handlerStart(true);
			});
		} catch (err) {
			console.error(err);
		}
	}
	// RENDERS
	renderStart() {
		this._clear();
		const HTML = this._generateStartHtml();

		this._parentElement.insertAdjacentHTML("afterbegin", HTML);
	}

	// board View

	renderBoard() {
		this._clear();

		const html = this._generateBoardHTML();

		this._parentElement.insertAdjacentHTML("afterbegin", html);

		const board = this._parentElement.querySelector(".board__view");

		board.style.gridTemplateColumns = `repeat(${+this._data.data
			.dimensions[0]},1fr)`;
	}

	_clear() {
		this._parentElement.innerHTML = "";
	}
	// GENERATORS
	_generateBoardHTML() {
		const labels = this._data.data.labels;

		const html_1 = `
							<section class="board">
								<div class="cursor-dot-outline"></div>
								<div class="cursor-dot"></div>
								<h3 class="board__title">${this._data.data.dimensions[0]} X ${this._data.data.dimensions[1]} board
								</h3>	
								
								<div class="board__view">`;
		const html_2 = labels
			.map((label, index) => {
				return `<div class="">
							<h5>[${label}]</h5>
							<div type="button" class="board__disc " data-position=${label[0]},${label[1]}>
								<div class="body-exp"></div>
								<div class="depth--exp"></div>
							</div>
						</div>`;
			})
			.join("");

		const html_3 = `
						</section>`;
		const HTML = [html_1, html_2, html_3].join("");
		return HTML;
	}

	_generateStartHtml() {
		return `
		<div class="game__view">
						<h1>Welcome to connect 4</h1>
						<h4>Ready to battle ?</h4>
						<img src=${imageName} alt="Connect 4">
						<button type="submit" class="btn play__now">Play now</button>
					</div>
				`;
	}
}

export default new GameView();
