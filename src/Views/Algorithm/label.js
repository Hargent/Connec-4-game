/**
 *Generates label for each grid area
 * @param {*} arr Array of iterations
 * @param {*} iterH Height iteration
 * @param {*} iterW Width iteration
 * @param {Number} width
 * @param {Number} height
 * @returns Array of arrays of iterations
 */
const gridArea = (height, width, arr = [], iterH = 0, iterW = 0) => {
	let subArr = [];

	if (iterH > height - 1 && iterW >= width - 1) return;

	if (iterH > height - 1) {
		iterW++;

		iterH = 0;
	}

	subArr = [iterW, iterH];

	iterH++;

	arr.push(subArr);
	gridArea(height, width, arr, iterH, iterW);

	return arr;
};

// console.log(gridArea(7, 8));

export default gridArea;
