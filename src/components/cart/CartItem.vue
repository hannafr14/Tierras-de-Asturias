<script setup>
defineProps({
    item: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['increase', 'decrease'])
</script>
<template>
        <article class="cart-item">
            <img
                class="cart-item_image"
                :src="item.image"
                :alt="item.name"
            >
            <div class="cart-item_info">
                <h2 class="cart-item_name">{{ item.name }}</h2>
                <p class="cart-item_farm">{{ item.farmName }}</p>
            </div>

            <span class="cart-item_price">
                {{ item.price }}€
            </span>

            <div class="cart-item_quantity">
                <button
                    class="cart-item_quantity-button"
                    type="button"
                    aria-label="Decrease quantity"
                    @click="emit('decrease')"
                >
                    -
                </button>

                <span class="cart-item_quantity-value">
                    {{ item.quantity }}
                </span>

                <button
                    class="cart-item_quantity-button"
                    type="button"
                    aria-label="Increase quantity"
                    @click="emit('increase')"
                >
                    +
                </button>
            </div>
        </article>
</template>
<style scoped lang="scss">
.cart-item {
    display: grid;
    grid-template-columns: 72px 1fr auto auto;
    align-items: center;
    gap: 14px;
    padding: 14px;
    border-radius: 8px;
    background: #FFFFFF;
    box-shadow: 0 3px 8px rgba(17, 24, 39, 0.08);

    &_image {
        width: 72px;
        height: 72px;
        border-radius: 6px;
        object-fit: cover;
    }

    &_name {
        margin: 0 0 4px;
        color: #111827;
        font-size: 15px;
        font-weight: 500;
        line-height: 21px;
    }

    &_farm {
        margin: 0;
        color: #007A3D;
        font-size: 12px;
        font-weight: 700;
        line-height: 17px;
    }

    &_price {
        color: #111827;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        white-space: nowrap;
    }

    &_quantity {
        width: 74px;
        height: 28px;
        display: inline-grid;
        grid-template-columns: 24px 1fr 24px;
        align-items: center;
        border: 1px solid #BECABA;
        border-radius: 6px;
        overflow: hidden;
    }

    &_quantity-button {
        width: 24px;
        height: 100%;
        padding: 0;
        border: none;
        background: #FFFFFF;
        color: #3F4A3E;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
            background: #E9EEFC;
        }

        &:focus-visible {
            outline: 2px solid rgba(0, 122, 61, 0.35);
            outline-offset: -2px;
        }
    }

    &_quantity-value {
        color: #3F4A3E;
        font-size: 13px;
        font-weight: 600;
        line-height: 28px;
        text-align: center;
    }
}

@media (max-width: 576px) {
    .cart-item {
        grid-template-columns: 64px 1fr;
        align-items: start;

        &_image {
            width: 64px;
            height: 64px;
        }

        &_price {
            grid-column: 2;
        }

        &_quantity {
            grid-column: 2;
        }
    }
}
</style>