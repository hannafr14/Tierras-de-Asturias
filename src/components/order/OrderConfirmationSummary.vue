<script setup>
defineProps({
    orderNumber: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div class="order-confirmation-summary">
        <div>
            <span>Nº de pedido</span>
            <strong>{{ orderNumber }}</strong>
        </div>

        <div>
            <span>Fecha</span>
            <strong>{{ date }}</strong>
        </div>

        <div>
            <span>Total</span>
            <strong>{{ total }}</strong>
        </div>
    </div>
</template>

<style scoped lang="scss">
.order-confirmation-summary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin: 0 auto 36px;
    padding: 20px 24px;
    border: 1px solid #BECABA;
    border-radius: 8px;
    background: #FFFFFF;
    text-align: left;

    span {
        display: block;
        margin-bottom: 8px;
        color: #6F7A6D;
        font-size: 11px;
        font-weight: 700;
        line-height: 16px;
        text-transform: uppercase;
    }

    strong {
        color: #111827;
        font-size: 15px;
        font-weight: 700;
        line-height: 20px;
    }

    div:last-child strong {
        color: #007A3D;
        font-size: 20px;
    }
}

@media (max-width: 576px) {
    .order-confirmation-summary {
        grid-template-columns: 1fr;
        gap: 16px;
    }
}
</style>