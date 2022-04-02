import { defineStore , acceptHMRUpdate } from "pinia";  // permet le rafrichissement automatique de la page losque le state change ( sans rafraichir completement la page)
import { groupBy } from "lodash"; // prend 2 parametre 1: tableau ,2: sur quoi on se base pour generer un objet et avec quel nom de clef
import { useAuthUserStore } from "@/stores/authUserStore.js";
import { useLocalStorage } from "@vueuse/core";

export const useCartStore = defineStore("CartStore", {
  historyEnabled: true, // variable creer pour que le plugi, history s'applique que pour ce store
  state: () => {
    return {
      items: useLocalStorage('CartStore:items'  ,[]), // utilise la fonction localStorage de la libraivue VueUse, permet de reset la page et garder les items dans le sotre sans les perdres
    };
  },
  getters: {
    count: (state) => state.items.length, // on peux utiliser les fonction standard et cibler le state avec this, ou les fonction anonyme en utilisant le premier parametre state pour remplacer le this
    // isEmpty() {
    //   // return this.items.length > 0  fonctionne aussi, on cible ici le state avec this car fonction basique et non arrow fonction
    //   return this.count === 0
    // },
    isEmpty: (state) => state.count === 0,
    grouped: (state) => {
      const grouped = groupBy(state.items, (item) => item.name);
      const sorted = Object.keys(grouped).sort();
      let inOrder = {};
      sorted.forEach((key) => {
        inOrder[key] = grouped[key];
      });
      return inOrder; // permet de ne pas changer l'ordre des elements dans le paniers puisque que l'o nreinjecte tout de nouveau quand on le manipule. ici, on trie par ordre alphabetique
    },
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
    checkout() {
      const authUserStore = useAuthUserStore();
      alert(
        `${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`
      );
      this.items = [];
    },
    addItems(count, item) {
      count = parseInt(count);
      for (let i = 0; i < count; i++) {
        this.items.push({ ...item }); // chaque item est different , si ont modifie une seul ,cela ne change pas tout , evite le stockage de reference
      }
    },
    removeThisItemFromCart(itemName) {
      this.items = this.items.filter((item) => item.name !== itemName);
    },
    setItemCount(item, count) {
      this.removeThisItemFromCart(item.name);
      this.addItems(count, item);
    },
  },
});

if(import.meta.hot){
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
