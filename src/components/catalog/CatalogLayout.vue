<script setup>
</script>

<template>
    <section class="catalog-layout">
        <div class="catalog-layout_content">
            <slot name="content" />
        </div>

        <div class="catalog-layout_map">
            <slot name="map" />
        </div>
    </section>

</template>

<style scoped lang="scss">
.catalog-layout {
    display: grid;
    grid-template-columns: 506px 1fr;
    min-height: calc(100vh - 59px - 94px);
    background: #F9F9FF;

    &_content {
        min-width: 0;
        padding: 0 35px 0;
        overflow-y: auto;
        border-right: 1px solid #E7ECF3;
    }

    &_map {
        min-width: 0;
        background: #DDE8DD;
    }
}

@media (max-width: 768px) {
    .catalog-layout {
        grid-template-columns: 1fr;

        &_content {
            padding: 0 20px 0;
            border-right: none;
        }

        &_map {
            min-height: 360px;
        }
    }
}

@media (max-width: 576px) {
    .catalog-layout {
        grid-template-columns: minmax(0, 1fr);
        min-height: auto;

        &_content {
            min-width: 0;
            padding: 16px 12px;
            border-right: none;
            overflow-x: hidden;
            overflow-y: visible;
        }

        &_map {
            display: none;
        }
    }
}
</style>