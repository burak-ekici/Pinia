<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore();
const productStore = useProductStore();  // permet de rendre le store reactif, fonction de pinia
productStore.fill() // actions store productStore.js
</script>

<template>
  <div class="container">
    <TheHeader />
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
