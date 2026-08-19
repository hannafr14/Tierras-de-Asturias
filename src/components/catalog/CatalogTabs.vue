<script setup>
</script>

<template>
    <nav class="catalog-tabs">
        <RouterLink class="catalog-tabs_link" to="/productos">
            Productos
        </RouterLink>

        <RouterLink class="catalog-tabs_link" to="/granjas">
            Granjas
        </RouterLink>
    </nav>
</template>

<style scoped lang="scss">
.catalog-tabs {
    display: none;
}

@media (max-width: 576px) {
    .catalog-tabs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 6px;
        margin-bottom: 14px;

        &_link {
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #D6DEEA;
            border-radius: 6px;
            background: #FFFFFF;
            color: #111827;
            font-size: 11px;
            font-weight: 600;
            text-decoration: none;

            &.router-link-active {
                border-color: #007A3D;
                background: #007A3D;
                color: #FFFFFF;
            }
        }
    }
}
</style>