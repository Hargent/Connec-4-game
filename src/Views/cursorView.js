class Cursor {
	#delay = 4;
	_x = 0;
	_y = 0;
	_endX = window.innerWidth / 2;
	_endY = window.innerHeight / 2;
	#cursorVisible = true;
	#cursorEnlarged = false;
	_parentElement = document.querySelector(".game");
	#dot = document.querySelector(".cursor-dot");
	#outline = document.querySelector(".cursor-dot-outline");

	init() {
		this.#dot = this._parentElement
			.querySelector(".board")
			.querySelector(".cursor-dot");
		this.#outline = this._parentElement
			.querySelector(".board")
			.querySelector(".cursor-dot-outline");

		// Set up element sizes
		this.dotSize = this.#dot.offsetWidth;
		this.outlineSize = this.#outline.offsetWidth;

		this.setupEventListeners();
		this.animateDotOutline();
	}

	setupEventListeners() {
		// Click events
		document.addEventListener("mousedown", e => {
			if (!e.target.closest(".board")) return;
			this.#cursorEnlarged = true;
			this.toggleCursorSize();
		});

		document.addEventListener("mouseup", e => {
			if (!e.target.closest(".board")) return;
			this.#cursorEnlarged = false;
			this.toggleCursorSize();
		});

		this._parentElement.addEventListener("mousemove", e => {
			if (!e.target.closest(".board")) return;
			// Show the cursor
			this.#cursorVisible = true;
			this.toggleCursorVisibility();

			// Position the dot
			this._endX = e.pageX;
			this._endY = e.pageY;
			this.#dot.style.top = this._endY + "px";
			this.#dot.style.left = this._endX + "px";
		});

		// Hide/show cursor
		this._parentElement
			.querySelector(".board")
			.addEventListener("mouseenter", e => {
				if (!e.target) return;
				this.#cursorVisible = true;
				this.toggleCursorVisibility();
				this.#dot.style.opacity = 1;
				this.#outline.style.opacity = 1;
			});

		this._parentElement
			.querySelector(".board")
			.addEventListener("mouseleave", e => {
				if (!e.target) return;

				this.#cursorVisible = true;
				this.toggleCursorVisibility();
				this.#dot.style.opacity = 0;
				this.#outline.style.opacity = 0;
			});
	}

	animateDotOutline() {
		this._x += (this._endX - this._x) / this.#delay;
		this._y += (this._endY - this._y) / this.#delay;
		this.#outline.style.top = this._y + "px";
		this.#outline.style.left = this._x + "px";

		requestAnimationFrame(this.animateDotOutline.bind(this));
	}

	toggleCursorSize() {
		if (this.#cursorEnlarged) {
			this.#dot.style.transform = "translate(-50%, -50%) scale(0.75)";
			this.#outline.style.transform = "translate(-50%, -50%) scale(1.5)";
		} else {
			this.#dot.style.transform = "translate(-50%, -50%) scale(1)";
			this.#outline.style.transform = "translate(-50%, -50%) scale(1)";
		}
	}

	toggleCursorVisibility() {
		if (this.#cursorVisible) {
			this.#dot.style.opacity = 1;
			this.#outline.style.opacity = 1;
		} else {
			this.#dot.style.opacity = 0;
			this.#outline.style.opacity = 0;
		}
	}
}

export default new Cursor();
