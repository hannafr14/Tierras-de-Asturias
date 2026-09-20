<script setup>
import { useCartStore } from '@/stores/cartStore'
import CartItem from '@/components/cart/CartItem.vue'

const cartStore = useCartStore()
</script>
<template>
    <main class="cart-page">
        <section class="cart-page_header">
            <h1 class="cart-page_title">Tu Cesta de la Tierra</h1>
            <p class="cart-page_description">
                Apoyando directamente a los productores locales de Asturias.
            </p>
        </section>

        <section class="cart-page_content">
            <p v-if="cartStore.items.length === 0" class="cart-page_empty">
                Tu cesta está vacía.
            </p>

            <div v-else class="cart-page_list">
                <CartItem
                    v-for="item in cartStore.items"
                    :key="item.id"
                    :item="item"
                />
            </div>
        </section>

        <RouterLink class="cart-page_continue" to="/productos">
            Seguir Comprando
        </RouterLink>
    </main>
</template>
<style scoped lang="scss">
.cart-page {
    min-height: calc(100vh - 59px - 94px);
    padding: 5px 35px 35px;
    background: #F9F9FF;

    &_header {
        margin-bottom: 24px;
    }

    &_title {
        margin: 0 0 8px;
        color: #111827;
        font-size: 28px;
        font-weight: 700;
        line-height: 36px;
    }

    &_description {
        margin: 0;
        color: #3F4A3E;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
    }

    &_content {
        margin-bottom: 28px;
    }

    &_empty {
        margin: 0;
        color: #6F7A6D;
        font-size: 16px;
        line-height: 24px;
    }

    &_continue {
        color: #007A3D;
        font-size: 13px;
        font-weight: 700;
        text-decoration: none;
    }

    &_list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
}
</style>