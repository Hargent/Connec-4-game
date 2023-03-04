/**
 * Algorithm for generating all possible linear combination of points in a 2D grid
 */
const getAllPointCombos = dimensions => {
	let combinations = [];
	for (let i = 0; i < dimensions[0]; i++) {
		for (let j = 0; j < dimensions[1]; j++) {
			// Generate combinations along rows
			if (j <= dimensions[1] - 4) {
				combinations.push([
					[i, j],
					[i, j + 1],
					[i, j + 2],
					[i, j + 3],
				]);
			}
			// Generate combinations along columns
			if (i <= dimensions[0] - 4) {
				combinations.push([
					[i, j],
					[i + 1, j],
					[i + 2, j],
					[i + 3, j],
				]);
			}
			// Generate combinations along diagonals
			if (i <= dimensions[0] - 4 && j <= dimensions[1] - 4) {
				combinations.push([
					[i, j],
					[i + 1, j + 1],
					[i + 2, j + 2],
					[i + 3, j + 3],
				]);
			}
			if (i <= dimensions[0] - 4 && j >= 3) {
				combinations.push([
					[i, j],
					[i + 1, j - 1],
					[i + 2, j - 2],
					[i + 3, j - 3],
				]);
			}
		}
	}
	return combinations;
};
// console.log(getAllPointCombos([6, 7]));
export default getAllPointCombos;
