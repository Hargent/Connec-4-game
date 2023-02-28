//SECTION - IMPORTS

class PlayerView {
	_parentElement = document.querySelector(".game__view");

	playerInputHandler(handler) {
		this._parentElement.addEventListener("click", function (e) {
			try {
				e.preventDefault();
				const createBtn = e.target.closest(".game__start");
				if (!createBtn) return;

				const form = this.querySelector(".players__form");

				const dataArr = [...new FormData(form)];
				const data = Object.fromEntries(dataArr);
				data.set = true;

				handler(data);
				this.classList.toggle("hidden");
			} catch (err) {
				console.error(err);
			}
		});
	}
	render() {
		this._clear();
		const HTML = this._generateHtml();
		this._parentElement.insertAdjacentHTML("afterbegin", HTML);
	}
	_clear() {
		this._parentElement.innerHTML = "";
	}
	_generateHtml() {
		return `
		<h1>Enter Players' details</h1>
		<div class="player__details">
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
