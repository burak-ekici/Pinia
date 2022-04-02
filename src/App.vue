<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore();
const productStore = useProductStore();  // permet de rendre le store reactif, fonction de pinia
cartStore.$onAction(({ name, store, args, after, onError }) => { // onAction permet d'executer du code lorsque qu'un actions est appelé
  if (name === 'addItems') {  // le name retourne le nom de la fonction dans actions, args , les arguments de cettes fonction (action), after permet d'executer du code apres l'execution de l'action, onError perme td'executer du code en cas d'erreur ( ex on renvoie throw Error ('gdfgdfg')) si il manque un parametre, c'est un fonction qui a en param 'error'
    after(() => {
      console.log(args[0])
      // alert(`Vous avez ajouter ${args[0]} produit${args[0] > 1 ? 's' : ''} dans votre panier`)
    })
    onError((e) => { console.log(e) })
  }
})
productStore.fill() // actions store productStore.js
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        @addToCart="cartStore.addItems($event, product)"
        :product="product"
      />
    </ul>
  </div>
</template>
