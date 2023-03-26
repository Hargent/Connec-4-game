//SECTION - IMPORTS

import imageName from "../../assets/connect4.gif";
import infoIcon from "../img/icons8-info.svg";

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

		["mouseover", "click"].map(ev =>
			this._parentElement.addEventListener(ev, e => {
				const infoIcon = e.target.closest(".info-icon");
				if (!infoIcon) return;
				const infoModal =
					this._parentElement.querySelector(".info-modal");

				if (infoModal.classList.contains("hidden"))
					infoModal.classList.remove("hidden");
			})
		);

		this._parentElement.addEventListener("mouseout", e => {
			const infoIcon = e.target.closest(".info-icon");
			if (!infoIcon) return;
			const infoModal = this._parentElement.querySelector(".info-modal");

			if (!infoModal.classList.contains("hidden"))
				infoModal.classList.add("hidden");
		});

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

		const html_1 = `<section class="board">
								<div class="cursor-dot-outline"></div>
								<div class="cursor-dot"></div>
								<h3 class="board__title">${this._data.data.dimensions[0]} X ${this._data.data.dimensions[1]} board
								</h3>	
								
								<div class="board__view">`;
		const html_2 = labels
			.map((label, index) => {
				return `<div class="">
							<h5>[${label}]</h5>
							<div type="button" class="board__disc " data-position=${label[0]},${label[1]} data-clicked=false>
								<div class="body-exp"></div>
								<div class="depth--exp"></div>
							</div>
						</div>`;
			})
			.join("");

		const html_3 = `</section>`;
		const HTML = [html_1, html_2, html_3].join("");
		return HTML;
	}

	_generateStartHtml() {
		const markup = `<div class="game__view">
							<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								class="info-icon"
								viewBox="0 0 512 512">
								<path fill="#25B7D3" d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z"></path><path fill="#FFF" d="M323.2 367.5c-1.4-2-4-2.8-6.3-1.7-24.6 11.6-52.5 23.9-58 25-.1-.1-.4-.3-.6-.7-.7-1-1.1-2.3-1.1-4 0-13.9 10.5-56.2 31.2-125.7 17.5-58.4 19.5-70.5 19.5-74.5 0-6.2-2.4-11.4-6.9-15.1-4.3-3.5-10.2-5.3-17.7-5.3-12.5 0-26.9 4.7-44.1 14.5-16.7 9.4-35.4 25.4-55.4 47.5-1.6 1.7-1.7 4.3-.4 6.2 1.3 1.9 3.8 2.6 6 1.8 7-2.9 42.4-17.4 47.6-20.6 4.2-2.6 7.9-4 10.9-4 .1 0 .2 0 .3 0 0 .2.1.5.1.9 0 3-.6 6.7-1.9 10.7-30.1 97.6-44.8 157.5-44.8 183 0 9 2.5 16.2 7.4 21.5 5 5.4 11.8 8.1 20.1 8.1 8.9 0 19.7-3.7 33.1-11.4 12.9-7.4 32.7-23.7 60.4-49.7C324.3 372.2 324.6 369.5 323.2 367.5zM322.2 84.6c-4.9-5-11.2-7.6-18.7-7.6-9.3 0-17.5 3.7-24.2 11-6.6 7.2-9.9 15.9-9.9 26.1 0 8 2.5 14.7 7.3 19.8 4.9 5.2 11.1 7.8 18.5 7.8 9 0 17-3.9 24-11.6 6.9-7.6 10.4-16.4 10.4-26.4C329.6 96 327.1 89.6 322.2 84.6z"></path>
							</svg>
						<div class="info-modal hidden">
							<div class="info-message">
								<p>
									Connect four points on the board either horizontally,
									<span>vertically or diagonally to win the game.</span>
								</p>
								<p>Have fun playing.</p>
							
							</div>
						
						</div>
						<h1>Welcome to connect 4</h1>
						<h4>Ready to battle ?</h4>
						<img src='${imageName}' alt="Connect 4">
						
						<button type="submit" class="btn play__now">Play now</button>
					</div>`;
		return markup;
	}
}

export default new GameView();
