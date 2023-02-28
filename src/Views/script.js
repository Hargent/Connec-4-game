// //!DOM CALL

const gameBtn = document.querySelector(".game__btn");
const gameStatus = document.querySelector("game__status");
const boardTitle = document.querySelector(".board__title");

const boardWidth = document.querySelector(".board__width");
const boardHeight = document.querySelector(".board__height");
const playerNames = document.querySelectorAll(".player__name");
const playerColors = document.querySelectorAll(".player__color");

console.log("HI");
// //!FUNCTIONS
const createBoard = (width, height) => {
	// const boardArea = width * height;
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			console.log(i, j);

			const html = `<div><input type="checkbox" class="board__disc" id="disc" />
            <label for="disc">[${i},${j}]</label></div>`;
			console.log(html);
			board.insertAdjacentHTML("beforeend", html);
		}
	}
	// board.style.display = "grid";
	// board.style.gridTemplateColumns = `repeat(${width},1fr)`;
	// board.style.gridTemplateRows = `repeat(${height} ,min-content)`;
};
createBoard(7, 6);
// //!EVENT LISTENERS
