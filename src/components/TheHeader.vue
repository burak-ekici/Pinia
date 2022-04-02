<!--  composition API -->

<!-- <script setup>
// imports
import CartWidget from './CartWidget.vue';      
</script> -->

<!-- Object Api  -->

<script>
import CartWidget from './CartWidget.vue';
import { mapActions, mapState , mapWritableState } from 'pinia'   // mapState ets en read only , si on souhaite modifier les valeurs, on utilise mapWritableState, la valeur changer avec mapWritableState est aussi changer dans le store
import { useAuthUserStore } from '@/stores/authUserStore.js'

export default {
  components: { CartWidget },
  computed: {
    // ...mapState(useAuthUserStore, ['username'])  // mapState importe aussi les getters avec pinia mais en read only, donc pas avec mapWritableState
    ...mapState(useAuthUserStore, { user : 'username'}) //  on peux aussi donner des nom de variable different lors de l importation
    // ...mapState(useAuthUserStore, {
    //   user : (store) => 'Hello ${store.username}'    on peux aussi utiliser dans fonction
    // })
    // ...mapWritableState(useAuthUserStore, { user : 'username'}) 

  },
  // methods :{
  //   ...mapActions(useAuthUserStore , ['nameofTheAction'])
  // }

}
</script>

<template>
  <header
    class="flex justify-between p-6 mb-10 items-center"
    style="background-image: url('/images/double-bubble-outline.png')"
  >
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
    <div>
      <!-- <input type="text" v-model="user" /> -->
      <span class="mr-5">{{ user }}</span>
      <CartWidget class="inline-block" />
    </div>
  </header>
</template>