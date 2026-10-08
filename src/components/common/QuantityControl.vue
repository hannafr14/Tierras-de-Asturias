<script setup>
defineProps({
    quantity: {
        type: Number,
        required: true,
    },
})

const emit = defineEmits(['increase', 'decrease'])
</script>

<template>
    <div class="quantity-control">
        <button
            class="quantity-control_button"
            type="button"
            aria-label="Decrease quantity"
            @click.stop="emit('decrease')"
        >
            -
        </button>

        <span class="quantity-control_value">
            {{ quantity }}
        </span>

        <button
            class="quantity-control_button"
            type="button"
            aria-label="Increase quantity"
            @click.stop="emit('increase')"
        >
            +
        </button>
    </div>
</template>

<style scoped lang="scss">
.quantity-control {
    width: 74px;
    height: 28px;
    display: inline-grid;
    grid-template-columns: 24px 1fr 24px;
    align-items: center;
    border: 1px solid #BECABA;
    border-radius: 6px;
    overflow: hidden;

    &_button {
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

    &_value {
        color: #3F4A3E;
        font-size: 13px;
        font-weight: 600;
        line-height: 28px;
        text-align: center;
    }
}
</style>