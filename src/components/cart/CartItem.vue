<script setup>
defineProps({
    item: {
        type: Object,
        required: true,
    },
})
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
            <span class="cart-item_quantity">
                {{ item.quantity }}
            </span>
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
        min-width: 28px;
        color: #3F4A3E;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
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
            text-align: left;
        }
    }
}
</style>