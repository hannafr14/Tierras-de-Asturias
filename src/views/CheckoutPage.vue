<script setup>
import CheckoutDeliveryForm from '@/components/checkout/CheckoutDeliveryForm.vue'
import CheckoutPaymentInfo from '@/components/checkout/CheckoutPaymentInfo.vue'
import OrderSummary from '@/components/cart/OrderSummary.vue'
import { useCartStore } from '@/stores/cartStore'
import { computed, reactive, ref } from 'vue'

const deliveryForm = reactive({
    firstName: '',
    lastName: '',
    city: '',
    postalCode: '',
    streetAddress: '',
    apartment: '',
    phone: '',
})

const checkoutError = ref('')
const isDeliveryFormValid = computed(() => {
    return Boolean(
        deliveryForm.firstName.trim()
        && deliveryForm.lastName.trim()
        && deliveryForm.city.trim()
        && deliveryForm.postalCode.trim()
        && deliveryForm.streetAddress.trim()
        && deliveryForm.phone.trim()
    )
})

const cartStore = useCartStore()

function roundMoney(value) {
    return Number(value.toFixed(2))
}

function createOrderPayload() {
    return {
        delivery: {
            firstName: deliveryForm.firstName.trim(),
            lastName: deliveryForm.lastName.trim(),
            city: deliveryForm.city.trim(),
            postalCode: deliveryForm.postalCode.trim(),
            streetAddress: deliveryForm.streetAddress.trim(),
            apartment: deliveryForm.apartment.trim(),
            phone: deliveryForm.phone.trim(),
        },
        items: cartStore.items.map((item) => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            unitPrice: roundMoney(item.price),
        })),
        subtotal: roundMoney(cartStore.subtotal),
        shipping: roundMoney(cartStore.shipping),
        taxes: roundMoney(cartStore.taxes),
        total: roundMoney(cartStore.total),
    }
}

function handleCheckoutConfirm() {
    checkoutError.value = ''

    if (!isDeliveryFormValid.value) {
        checkoutError.value = 'Completa los datos de entrega antes de continuar.'
        return
    }

    const orderPayload = createOrderPayload()

    console.log(orderPayload)
}
</script>

<template>
    <main class="checkout-page">
        <div class="checkout-page_layout">
            <div class="checkout-page_forms">
                <CheckoutDeliveryForm v-model="deliveryForm" />

                <p v-if="checkoutError" class="checkout-page_error">
                    {{ checkoutError }}
                </p>

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
                @confirm="handleCheckoutConfirm"
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

    &_error {
        margin: -12px 0 0;
        color: #B42318;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
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