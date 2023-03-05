import getAllPointCombos from "./Algorithm/combination";
import gridArea from "./Algorithm/label";

/**
 * Algorithm Class that generates the game data
 */
class GameAlgo {
	/**
	 * Generates all labels and possible combos
	 */
	_gameAlgo(dimensions) {
		// const labels = gridArea(dimensions);
		const labels = gridArea(dimensions[0], dimensions[1]);

		const combos = getAllPointCombos(dimensions);

		return [labels, combos];
	}
}

export default new GameAlgo();
