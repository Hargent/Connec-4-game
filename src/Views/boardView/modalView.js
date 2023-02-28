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
}

export default new ModalView();
