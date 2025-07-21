import { rnd } from "./rnd.js";

export const shuffle = (array) => {
  for (let i = array.length - 1; i >= 1; i--) {
    const n = rnd(i + 1);
  	const tmp = array[i];
		array[i] = array[n];
		array[n] = tmp;
	}
};
