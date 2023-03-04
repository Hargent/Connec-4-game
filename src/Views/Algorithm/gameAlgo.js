import getAllPointCombos from "./Algorithm/results";
import gridArea from "./Algorithm/label";

/**
 * Algorithm Class that generates the game data
 */
class GameAlgo {
	/**
	 * Generates all labels and possible combos
	 */
	_gameAlgo(dimensions) {
		const labels = gridArea(dimensions);

		const combos = getAllPointCombos(dimensions);

		return [labels, combos];
	}
}

export default new GameAlgo();
