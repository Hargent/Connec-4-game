//SECTION -IMPORTS

import gridArea from "../Algorithm/label";

// import View from "./View";

class BoardView {
	_parentElement = document.querySelector(".board");
	_boardView = document.querySelector(".board__view");
	_boardTitle = this._parentElement.querySelector(".board__title");
	_data;

	render(data) {
		this._data = data;

		this._updateBoard();
		const html = this._generateHTML();

		this._boardView.insertAdjacentHTML("afterbegin", html);
	}
	_updateBoard() {
		this._boardTitle.innerHTML = `${this._data.width} x ${this._data.height} board`;
		this._boardView.style.gridTemplateColumns = `repeat(${+this._data
			.width},1fr)`;
	}

	_generateHTML() {
		const labels = gridArea(this._data.width, this._data.height);

		const HTML = labels
			.map((label, index) => {
				return `<div class="">
						<label for="disc-15">[${label}]</label>
						<input type="button" class="board__disc" data-position=(${label[0]},${label[1]}) id="disc-${index}" />
						</div>`;
			})
			.join("");
		return HTML;

		// return
	}
}
/*!SECTION
dimension inputs
shape
button
*/
export default new BoardView();
