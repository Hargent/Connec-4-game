/**
 * This mutates the old DOM array to have the same value as the new array
 * @param {Object[]} arr1 The new data to be rendered in the DOM
 * @param {Object[]} arr2 The old data that has already been rendered in the DOM
 * @returns Mutated Old data array  which is re-rendered with yhe updated values
 */

const updateAlgo = (arr1, arr2) => {
    let count = 0;
    const length = arr1.length;
    const update = () => {
        if (count === length) return;

        if (
            !arr1[count].isEqualNode(arr2[count]) &&
            arr1[count].firstChild?.nodeValue.trim() !== ''
        ) {
            arr2[count].texContent = arr1[count].texContent;
        }
        if (!arr1[count].isEqualNode(arr2[count])) {
            Array.from(arr1[count].attributes).forEach(attribute => {
                arr2[count].setAttribute(attribute.name, attribute.value);
            });
        }
        count++;
        update();
    };
    update();
    return arr1;
};

export default updateAlgo;
