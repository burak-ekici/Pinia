import { defineStore } from "pinia";
import { groupBy, reduce } from "lodash"; // prend 2 parametre 1: tableau ,2: sur quoi on se base pour generer un objet et avec quel nom de clef

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  getters: {
    count: (state) => state.items.length, // on peux utiliser les fonction standard et cibler le state avec this, ou les fonction anonyme en utilisant le premier parametre state pour remplacer le this
    // isEmpty() {
    //   // return this.items.length > 0  fonctionne aussi, on cible ici le state avec this car fonction basique et non arrow fonction
    //   return this.count === 0
    // },
    isEmpty: (state) => state.count === 0,
    grouped: (state) => groupBy(state.items, (item) => item.name),
    groupCount(state) {
      // comme on ne peux pas donner de parametre a un getter comme a un computed, on retourne une fonction et donc on peux leur donner un parametre
      return (name) => {
        return state.grouped[name].length;
      };
    },
    total: (state) =>
      state.items.reduce((reducer, el) => (reducer += el.price), 0),
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count);
      for (let i = 0; i < count; i++) {
        this.items.push({ ...item }); // chaque item est different , si ont modifie une seul ,cela ne change pas tout , evite le stockage de reference
      }
    },
    removeThisItemFromCart(itemName) {
      this.items = this.items.filter((item) => item.name !== itemName);
    },
  },
});
