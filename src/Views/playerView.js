//SECTION - IMPORTS

import convertColor from "./Algorithm/convert";

class PlayerView {
	_root = document.querySelector(":root");
	_parentElement = document.querySelector(".game");
	_data;
	_currentPlayer;

	_getPlayerData(data) {
		this._data = data;

		this._currentPlayer = this._data.homeTurn
			? this._data.away.id
			: this._data.home.id;
	}

	_setColor = color => {
		const set = color
			.split("(")[1]
			.split(")")[0]
			.split(", ")
			.filter(el => {
				if (el === "0") {
					return el;
				} else if (parseInt(el)) {
					return el;
				} else return;
			});
		return set;
	};
	/**
	 *
	 * @param {Number[]} target 2D coordinates of a point of event
	 * @returns Void Only when cells are clicked twice
	 */
	placeMark(target) {
		const cell = document.querySelector(
			`[data-position="${target.join(",")}"]`
		);
		const icons = this._parentElement.querySelectorAll(".player__icon");

		this._currentPlayer = this._data.homeTurn
			? this._data.home.id
			: this._data.away.id;

		[...icons].map(icon => {
			if (
				!icon.isEqualNode(
					document.querySelector(`.${this._currentPlayer}-icon`)
				)
			) {
				const color = !this._data.homeTurn
					? this._data.home.color
					: this._data.away.color;
				icon.style.fill = color;
			} else {
				icon.style.fill = "#fff";
			}
		});

		this._root.style.setProperty(
			"--cursor-primary",
			!this._data.homeTurn ? this._data.home.color : this._data.away.color
		);
		const cursorGrad = this._setColor(
			convertColor(
				!this._data.homeTurn
					? this._data.home.color
					: this._data.away.color
			).hsl
		);
		// setting root properties
		this._root.style.setProperty("--cursor-primary-light-h", cursorGrad[0]);
		this._root.style.setProperty("--cursor-primary-light-s", cursorGrad[1]);
		this._root.style.setProperty("--cursor-primary-light-l", cursorGrad[2]);

		const homeCol = this._setColor(convertColor(this._data.home.color).hsl);
		const awayCol = this._setColor(convertColor(this._data.away.color).hsl);

		this._root.style.setProperty("--query-home-color-h", homeCol[0]);
		this._root.style.setProperty("--query-home-color-s", homeCol[1]);
		this._root.style.setProperty("--query-home-color-l", homeCol[2]);
		this._root.style.setProperty("--query-away-color-h", awayCol[0]);
		this._root.style.setProperty("--query-away-color-s", awayCol[1]);
		this._root.style.setProperty("--query-away-color-l", awayCol[2]);

		if (cell?.classList.length > 1 || this._data.homeWin !== null) {
			cell?.classList.add("disabled");
			return;
		}
		cell.classList.add(this._currentPlayer);
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

				const target = disc.dataset.position
					.split(",")
					.map(str => parseInt(str));

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
	// BOARD VIEW

	renderBoard() {
		const HTML = this._generateBoardHtml();
		this._parentElement.insertAdjacentHTML("afterbegin", HTML);

		// initial colored icon

		const initialColored = document.querySelector(
			`[data-name="${
				!this._data.homeTurn ? this._data.home.id : this._data.away.id
			}"]`
		);

		initialColored.style.fill = !this._data.homeTurn
			? this._data.home.color
			: this._data.away.color;

		this._root.style.setProperty(
			"--cursor-primary",
			!this._data.homeTurn ? this._data.home.color : this._data.away.color
		);

		const cursorGrad = this._setColor(
			convertColor(
				!this._data.homeTurn
					? this._data.home.color
					: this._data.away.color
			).hsl
		);
		this._root.style.setProperty("--cursor-primary-light-h", cursorGrad[0]);
		this._root.style.setProperty("--cursor-primary-light-s", cursorGrad[1]);
		this._root.style.setProperty("--cursor-primary-light-l", cursorGrad[2]);
	}
	_clear() {
		this._parentElement.innerHTML = "";
	}
	// GENERATORS
	_generateBoardHtml() {
		console.log(this._data.isEnd, this._data.isDraw);
		return `<div class="players__display">
					<div>
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								class="player__icon home-icon"
								data-name="home"
								width="50" height="50"
								viewBox="0 0 33.957 46.001">
								<path d="M 17.012,0 C 6.6,-0.033 -1.029,9.438 0.113,19.788 1.285,30.411 8.75,41.674 12.206,45.656 A 1,1 0 0 0 13.957,45 V 26.154 a 1.022,1.022 0 0 0 -0.63,-0.927 8.99,8.99 0 0 1 -5.365,-8.515 9.337,9.337 0 0 1 9,-8.708 8.868,8.868 0 0 1 9,9 8.989,8.989 0 0 1 -5.37,8.226 1.025,1.025 0 0 0 -0.63,0.929 V 33 a 1.008,1.008 0 0 0 1.264,0.971 C 28.544,32.078 33.957,24.914 33.957,17 A 17,17 0 0 0 17.012,0 Z"></path>
							</svg>
					
						</div>
						<img src="#" alt="${this._data.home.avatar}">
						<h1>${this._data.home.name !== "" ? this._data.home.name : this._data.home.id}
						
					</div>
					<div>
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								class="player__icon away-icon"
								data-name="away"
								width="50" height="50"
								viewBox="0 0 33.957 46.001">
								<path d="M 17.012,0 C 6.6,-0.033 -1.029,9.438 0.113,19.788 1.285,30.411 8.75,41.674 12.206,45.656 A 1,1 0 0 0 13.957,45 V 26.154 a 1.022,1.022 0 0 0 -0.63,-0.927 8.99,8.99 0 0 1 -5.365,-8.515 9.337,9.337 0 0 1 9,-8.708 8.868,8.868 0 0 1 9,9 8.989,8.989 0 0 1 -5.37,8.226 1.025,1.025 0 0 0 -0.63,0.929 V 33 a 1.008,1.008 0 0 0 1.264,0.971 C 28.544,32.078 33.957,24.914 33.957,17 A 17,17 0 0 0 17.012,0 Z"></path>
							</svg>
							
						</div>
					<img src="#" alt="${this._data.away.avatar}">
					<h1>${this._data.away.name !== "" ? this._data.away.name : this._data.away.id}
					</h1>
					</div>
					<div>
					<div >
						<div class="winner-box">			
							<div type="button" class="
								${this._data.isEnd ? "" : "hidden"}
								${!this._data.homeTurn ? this._data.home.id : this._data.away.id}">
								<div class="body-exp"></div>
								<div class="depth--exp"></div>
							</div>
						
							<h3>Player1, please select a coin</h3>
						</div>
						<div class="btn-box">
							<button class="btn reset__game" type="button" data-toggle="reset">Reset Game</button>
							<button class="btn restart__game" type="button" data-toggle="restart">Restart Game</button>
						</div>
					
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
				<div class="board__dimensions">
				<h4>Enter the board dimension</h4>
				
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
			

			</div>
			</form>
			<button type="submit" class="btn game__start">
				Start game
			</button>
			</div>
			`;
	}
}

// 		`;

export default new PlayerView();
