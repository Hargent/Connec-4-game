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

// /**
//  *
//  * @param {Number[]} dimensions
//  * @returns{[Number[]]} Returns 2D labels for each grid item
//  */
// const gridArea = dimensions => {
// 	const arr = [...Array(dimensions[0] * dimensions[0])].map((_, i) => [
// 		i % dimensions[0],
// 		Math.floor(i / dimensions[0]),
// 	]);
// 	if (dimensions[0] - dimensions[1] < 0) {
// 		console.log("not equal pop width");
// 	}
// 	if (dimensions[0] - dimensions[1] > 0) {
// 		console.log(arr);
// 		arr.splice(arr.length - 1 - dimensions[1], arr.length);
// 		console.log("not equal pop height");
// 		console.log(arr);
// 	}
// 	return arr;
// };
// console.log(gridArea(7, 8));
// console.log(gridArea([7, 6]));
export default gridArea;
