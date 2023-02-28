//SECTION -IMPORTS

import PossibleCombination from "../Algorithm/combination";
import gridArea from "../Algorithm/label";

// import View from "./View";

class BoardView {
	_parentElement = document.querySelector(".board");
	_data;

	_createBoard(data) {
		// console.log(data);
		this._data = data;
		const boardTitle = this._parentElement.querySelector(".board__title");
		boardTitle.innerHTML = `${this._data.width} x ${this._data.height} board`;

		const boardView = this._parentElement.querySelector(".board__view");
		const labels = gridArea(this._data.width, this._data.height);
		const html = this._generateHTML(labels);

		boardView.insertAdjacentHTML("afterbegin", html);
		const boardModal = this._parentElement.querySelector(".board__modal");
		boardModal.classList.toggle("hidden");
		boardView.style.gridTemplateColumns = `repeat(${+this._data
			.width},1fr)`;
	}
	_generateHTML(labels) {
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
