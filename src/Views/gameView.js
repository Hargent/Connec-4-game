//SECTION - IMPORTS

// import View from "./View";

class GameView {
	_parentElement = document.querySelector(".game");

	gameStartHandler(handler) {
		this._parentElement.addEventListener("click", e => {
			const playBtn = e.target.closest(".play__now");
			if (!playBtn) return;
			handler(true);
		});
	}
	render() {
		// this._clear();
		const HTML = this._generateHtml();

		this._parentElement.insertAdjacentHTML("afterbegin", HTML);
	}
	_clear() {
		this._parentElement.innerHTML = "";
	}
	_generateHtml() {
		return `<section class="game__view">
	
				</section>`;
	}
}
export default new GameView();
