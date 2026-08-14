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
        padding: 0 21px;
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
            border-right: none;
        }

        &_map {
            min-height: 360px;
        }
    }
}

@media (max-width: 576px) {
    .catalog-layout {
        grid-template-columns: 1fr;
        min-height: auto;

        &_content {
            padding: 16px 12px;
            border-right: none;
            overflow-y: visible;
        }

        &_map {
            display: none;
        }
    }
}
</style>