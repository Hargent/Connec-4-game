//SECTION - IMPORTS

class PlayerView {
	_parentElement = document.querySelector(".game");
	_data;

	_getPlayerData(data) {
		this._data = data;
	}

	// HANDLERS
	playerDetailsHandler(handler) {
		this._parentElement.addEventListener("click", function (e) {
			try {
				e.preventDefault();
				const createBtn = e.target.closest(".game__start");
				if (!createBtn) return;

				const form = this.querySelector(".players__form");

				const dataArr = [...new FormData(form)];
				const data = Object.fromEntries(dataArr);

				handler(data);
			} catch (err) {
				console.error(err);
			}
		});
	}
	playerInputHandler(handler) {
		this._parentElement.addEventListener("click", e => {
			try {
				const disc = e.target.closest(".board__disc");
				if (!disc) return;
				const target = disc.dataset.position;
				handler(target);
			} catch (err) {
				console.error(err);
			}
		});
	}
	// RENDERS
	render() {
		this._clear();
		const HTML = this._generateHtml();
		this._parentElement.insertAdjacentHTML("afterbegin", HTML);
	}
	renderBoard() {
		const HTML = this._generateBoardHtml();
		this._parentElement.insertAdjacentHTML("afterbegin", HTML);
	}
	_clear() {
		this._parentElement.innerHTML = "";
	}
	// GENERATORS
	_generateBoardHtml() {
		return `<div class="players__display">
					<div>
						<img src="#" alt="${this._data.home.avatar}">
						<h1>${
							this._data.home.name !== ""
								? this._data.home.name
								: this._data.home.id
						}</h1>
					${!this._data.homeTurn ? "<h1>Flag</h1>" : ""}
					</div>
					<div>
					<img src="#" alt="${this._data.away.avatar}">
					<h1>${
						this._data.away.name !== ""
							? this._data.away.name
							: this._data.away.id
					}</h1>
					${!this._data.homeTurn ? "" : "<h1>Flag</h1>"}
					</div>
				</div>`;
	}
	_generateHtml() {
		return `
		<div class="player__details">
		<h1>Enter Players' details</h1>
			<form class="players__form">
				<div class="player player1">
					<h3>player 1</h3>
					<input
						type="text"
						name="home"
						class="player__name"
						id="player-1-name"
						placeholder="Enter your name" />
					<label for="player-1-name"></label>
					<div>
						<label for="player-1-color">Color</label>
						<select  id="player-1-color" title="Select" name="homeColor">
							<option value="purple"></option>
							<option value="red">Red</option>
							<option value="green">Green</option>
							<option value="yellow">Yellow</option>
							<option value="blue">Blue</option>
						</select>
					</div>
					
				</div>
				<div class="player player2">
					<h3>player 2</h3>
					<input
						type="text"
						class="player__name"
						name="away"
						id="player-2-name"
						placeholder="Enter your name" />
					<label for="player-2-name"></label>
					<div>
					<label for="player-2-color">Color</label>
					<select  id="player-2-color" title="Select" name="awayColor">
							<option value="gold"></option>
							<option value="red">Red</option>
							<option value="green">Green</option>
							<option value="yellow">Yellow</option>
							<option value="blue">Blue</option>
						</select>
					</div>
					
				</div>
			</form>
			<button type="submit" class="btn game__start">
				Start game
			</button>
			</div>
			`;
	}
}

export default new PlayerView();
