<script setup>
import CheckoutDeliveryForm from '@/components/checkout/CheckoutDeliveryForm.vue'
import CheckoutPaymentInfo from '@/components/checkout/CheckoutPaymentInfo.vue'
import OrderSummary from '@/components/cart/OrderSummary.vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
    <main class="checkout-page">
        <div class="checkout-page_layout">
            <div class="checkout-page_forms">
                <CheckoutDeliveryForm />
                <CheckoutPaymentInfo />
            </div>

            <OrderSummary
                :subtotal="cartStore.subtotal"
                :shipping="cartStore.shipping"
                :taxes="cartStore.taxes"
                :total="cartStore.total"
                button-text="Confirmar y pagar"
                :button-to="null"
                :items="cartStore.items"
            />
        </div>
    </main>
</template>

<style scoped lang="scss">
.checkout-page {
    padding: 32px 48px 80px;

    &_layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 360px;
        gap: 32px;
        align-items: start;
    }

    &_forms {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
}

@media (max-width: 900px) {
    .checkout-page {
        &_layout {
            grid-template-columns: 1fr;
        }
    }
}

@media (max-width: 768px) {
    .checkout-page {
        padding: 24px 16px 64px;
    }
}
</style>