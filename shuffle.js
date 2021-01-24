import { rnd } from "./rnd.js";

const shuffle = (array) => {
    for (let i = 0; i < array.length; i++) {
		const n = rnd(array.length);
		const tmp = array[i];
		array[i] = array[n];
		array[n] = tmp;
	}
};

export { shuffle };
