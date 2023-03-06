//SECTION - IMPORTS

import imageName from "../../assets/connect4.gif";

class GameView {
	_parentElement = document.querySelector(".game");
	_data;

	_getGameData(data) {
		this._data = data;
	}
	// HANDLERS
	gameStartHandler(handler) {
		this._parentElement.addEventListener("click", e => {
			const playBtn = e.target.closest(".play__now");
			if (!playBtn) return;
			handler(true);
		});
	}
	modalInputHandler(handler) {
		try {
			this._parentElement.addEventListener("click", function (e) {
				const createBtn = e.target.closest(".create__board");
				if (!createBtn) return;

				const form = this.querySelector(".board__inputs");
				const dataArr = [...new FormData(form)];
				const data = Object.fromEntries(dataArr);

				handler(data);
			});
		} catch (err) {
			console.error(err);
		}
	}

	// RENDERS
	renderStart() {
		const HTML = this._generateStartHtml();

		this._parentElement.insertAdjacentHTML("afterbegin", HTML);
	}

	// modal view
	renderModal() {
		this._clear();
		const HTML = this._generateModalHtml();

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
							<h3 class="board__title">${this._data.data.dimensions[0]} X ${this._data.data.dimensions[1]} board</h3>
							<div class="board__view">`;
		const html_2 = labels
			.map((label, index) => {
				return `<div class="">
							<label for="disc-15">[${label}]</label>
							<input type="button" class="board__disc" data-position=${label[0]},${label[1]} />
						</div>`;
			})
			.join("");

		const html_3 = `</div>
					</section>`;
		const HTML = [html_1, html_2, html_3].join("");
		return HTML;

		// return
	}
	_generateModalHtml() {
		return `
		<div class="board__modal">
				<h4>Enter the board dimension</h4>
				<form class="board__inputs">
					<div class="board__input">
						<input
							step="1"
							min="6"
							value="7"
							max="15"
							required
							name="width"
							type="number"
							class="board__width"
							id="board-width"
							placeholder="width" />
						<label for="board-width" class="label">Width</label>
					</div>
					<div class="board__input">
						<input
							step="1"
							min="6"
							max="15"
							value="6"
							required
							name="height"
							type="number"
							class="board__width"
							id="board-height"
							placeholder="height" />
						<label for="board-height" class="label">Height</label>
					</div>
					<div class="board__piece">
						<h4>Select a game piece shape</h4>
						<select name="piece" id="board__piece" title="Select">
							<option value="circle">Circle</option>
							<option value="square">Square</option>
							<option value="Triangle">Triangle</option>
							<option value="kite">Kite</option>
						</select>
					</div>
				</form>

				<button class="btn create__board" type="submit">Create Board</button>
			</div>`;
	}
	_generateStartHtml() {
		return `
		<div class="game__view">
						<h1>Welcome to connect 4</h1>
						<h4>Ready to battle ?</h4>
						<img src="${imageName}" alt="Connect 4" />
						<button type="submit" class="btn play__now">Play now</button>
					</div>
				`;
	}
}

// /**
//  *
//  * @param {()=>{}} handlerON A controller handler function that is called to handle the hover-ON event
//  * @param { ()=>{}} handlerOUT A controller handler function that is called to handle the hover-OFF event
//  */
// gameHoverHandler(handlerON, handlerOUT) {
// 	this._parentElement.addEventListener("mouseover", e => {
// 		const cellBtn = e.target.closest(".cell");
// 		if (!cellBtn) return;

// 		handlerON(cellBtn);
// 	});
// 	this._parentElement.addEventListener("mouseout", e => {
// 		const cellBtn = e.target.closest(".cell");
// 		if (!cellBtn) return;

// 		handlerOUT(cellBtn);
// 	});
// }
export default new GameView();
