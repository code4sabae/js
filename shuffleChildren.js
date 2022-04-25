import { shuffle } from "./shuffle.js";

export const shuffleChildren = (container) => {
  const eles = container.children;
    const num = [];
    for (let i = 0; i < eles.length; i++) {
      num[i] = i;
    }
    shuffle(num);
    for (let i = 0; i < eles.length; i++) {
      container.appendChild(eles[num[i]]);
    }
};
