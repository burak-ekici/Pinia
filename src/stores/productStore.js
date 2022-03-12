import { defineStore } from "pinia";

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return {
      products: [],
    };
  },
  actions: {
    async fill() {
      this.products = (await import("@/data/products.json")).default;
    },
  },
}); // premier arugment , le nom du store, il sera visible sur le devtool, le second prend des options en valeur dans un objet comme : state , actions, getters
