class ModalView {
	_parentElement = document.querySelector(".board__modal");

	modalInputHandler(handler) {
		this._parentElement.addEventListener("click", function (e) {
			try {
				const createBtn = e.target.closest(".board__create__btn");
				if (!createBtn) return;
				const form = this.querySelector(".board__inputs");
				const dataArr = [...new FormData(form)];
				const data = Object.fromEntries(dataArr);
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
		this._parentElement.classList.toggle("hidden");
		this._parentElement.insertAdjacentHTML("afterbegin", HTML);
	}
	_clear() {
		this._parentElement.innerHTML = "";
	}

	_generateHtml() {
		return `
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

				<button class="btn" type="submit">Create Board</button>
			`;
	}
}

export default new ModalView();
