//SECTION - IMPORTS

import convertColor from "./Algorithm/convert";
import updateAlgo from "./Algorithm/updateAlgo";

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
	// UPDATE
	/**
	 * Updates only part of the DOM with new values
	 * @param {Object | Object[]} data The data to be rendered (e.g recipe details data)
	 *
	 */
	updateBoard(data) {
		this._data = data;
		this._currentPlayer = this._data.homeTurn
			? this._data.away.id
			: this._data.home.id;
		const newHtml = this._generateBoardHtml();
		// creating a virtual dom in memory
		const newDom = document.createRange().createContextualFragment(newHtml);
		const newElements = Array.from(newDom.querySelectorAll("*"));
		const currentElement = Array.from(
			this._parentElement.querySelectorAll("*")
		);

		// console.time('t1');

		updateAlgo(newElements, currentElement);
	}

	// _convert(rgba) {
	// 	rgba = rgba.match(
	// 		/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
	// 	);

	// 	function hexCode(i) {
	// 		return ("0" + parseInt(i).toString(16)).slice(-2);
	// 	}

	// 	let hexColor =
	// 		"#" + hexCode(rgba[1]) + hexCode(rgba[2]) + hexCode(rgba[3]);

	// 	// Check if alpha channel is present and add it to the hex color code
	// 	if (rgba[4]) {
	// 		let alpha = Math.round(parseFloat(rgba[4]) * 255);
	// 		hexColor += hexCode(alpha);
	// 	}

	// 	return hexColor;
	// }

	// _adjustColor(hexColor, magnitude) {
	// 	hexColor = hexColor.replace(`#`, ``);
	// 	if (hexColor.length === 6) {
	// 		const decimalColor = parseInt(hexColor, 16);
	// 		let r = (decimalColor >> 16) + magnitude;
	// 		r > 255 && (r = 255);
	// 		r < 0 && (r = 0);
	// 		let g = (decimalColor & 0x0000ff) + magnitude;
	// 		g > 255 && (g = 255);
	// 		g < 0 && (g = 0);
	// 		let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
	// 		b > 255 && (b = 255);
	// 		b < 0 && (b = 0);
	// 		return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
	// 	} else {
	// 		return hexColor;
	// 	}
	// }
	// _createAdjustedColor(classEl, magnitude) {
	// 	const rgbColor = window.getComputedStyle(
	// 		document.querySelector(classEl)
	// 	).fill;

	// 	const hexColor = this._convert(rgbColor);
	// 	return this._adjustColor(hexColor, magnitude);
	// }

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
		// setting root color styles
		// const hexColor = this._createAdjustedColor(
		// 	`.${this._currentPlayer}-icon`,
		// 	50
		// );

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
							<!--<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								width="50" height="50"
								class="player__icon home-icon"
								data-name="home"
								viewBox="0 0 33.957 46.001">
								<path d="m 16.958,2 h 0.048 a 15.026,15.026 0 0 1 14.951,15 c 0,6.251 -4.74,12.456 -11,14.657 v -4.865 a 10.561,10.561 0 0 0 6,-9.792 9.794,9.794 0 0 0 -10,-10 9.9,9.9 0 0 0 -10,10 10.559,10.559 0 0 0 6,9.792 v 15.4 C 9.669,37.983 3.1,28.579 2.1,19.569 A 16.31,16.31 0 0 1 6.1,6.9 14.434,14.434 0 0 1 16.958,2 m 0,-2 C 6.572,0 -1.027,9.456 0.113,19.788 1.285,30.411 9.75,41.674 13.206,45.656 A 0.971,0.971 0 0 0 13.948,46.001 1,1 0 0 0 14.957,45 V 26.154 A 1.022,1.022 0 0 0 14.327,25.227 8.577,8.577 0 0 1 8.957,17 a 7.887,7.887 0 0 1 8,-8 7.829,7.829 0 0 1 8,8 8.657,8.657 0 0 1 -5.37,8.226 1.025,1.025 0 0 0 -0.63,0.929 V 33 a 1.007,1.007 0 0 0 1.008,1 1.034,1.034 0 0 0 0.256,-0.033 C 27.544,32.078 33.957,24.914 33.957,17 A 17,17 0 0 0 17.012,0 Z"></path>
							</svg>-->
					
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
						


						<!--<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
							width="50" height="50"
							class="player__icon away-icon"
							data-name="away"
							viewBox="0 0 33.957 46.001">
							<path d="m 16.958,2 h 0.048 a 15.026,15.026 0 0 1 14.951,15 c 0,6.251 -4.74,12.456 -11,14.657 v -4.865 a 10.561,10.561 0 0 0 6,-9.792 9.794,9.794 0 0 0 -10,-10 9.9,9.9 0 0 0 -10,10 10.559,10.559 0 0 0 6,9.792 v 15.4 C 9.669,37.983 3.1,28.579 2.1,19.569 A 16.31,16.31 0 0 1 6.1,6.9 14.434,14.434 0 0 1 16.958,2 m 0,-2 C 6.572,0 -1.027,9.456 0.113,19.788 1.285,30.411 9.75,41.674 13.206,45.656 A 0.971,0.971 0 0 0 13.948,46.001 1,1 0 0 0 14.957,45 V 26.154 A 1.022,1.022 0 0 0 14.327,25.227 8.577,8.577 0 0 1 8.957,17 a 7.887,7.887 0 0 1 8,-8 7.829,7.829 0 0 1 8,8 8.657,8.657 0 0 1 -5.37,8.226 1.025,1.025 0 0 0 -0.63,0.929 V 33 a 1.007,1.007 0 0 0 1.008,1 1.034,1.034 0 0 0 0.256,-0.033 C 27.544,32.078 33.957,24.914 33.957,17 A 17,17 0 0 0 17.012,0 Z"></path>
						</svg>-->
					</div>
					<img src="#" alt="${this._data.away.avatar}">
					<h1>${this._data.away.name !== "" ? this._data.away.name : this._data.away.id}
					</h1>
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
