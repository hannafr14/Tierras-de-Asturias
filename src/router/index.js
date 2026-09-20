import { createRouter, createWebHistory } from 'vue-router';
import ProductsPage from '@/views/ProductsPage.vue';
import GranjasPage from '@/views/GranjasPage.vue';
import CartPage from '@/views/CartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/granjas',
    },
    {
      path: '/productos',
      name: 'productos',
      component: ProductsPage,
    },
    {
      path: '/granjas',
      name:  'granjas',
      component: GranjasPage,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage,
    },
  ],
})

export default router
