<script setup>
import filterIcon from '@/assets/filter.svg';

defineEmits(['click'])
</script>

<template>
    <button
        class="filters-button"
        type="button"
        @click="$emit('click')"
    >
        <img
            class="filters-button_icon"
            :src="filterIcon"
            alt=""
        >
        <span>Filtros</span>
    </button>
</template>

<style scoped lang="scss">
.filters-button {
    height: 36px;
    min-width: 106px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 0 18px;
    border: 1px solid #BECABA;
    border-radius: 6px;
    background: #E9EEFC;
    color: #3F4A3E;
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    cursor: pointer;

    &:hover {
        border-width: 1.5px;
    }

    &:focus-visible {
        outline: 2px solid rgba(0, 122, 61, 0.35);
        outline-offset: 2px;
    }

    &_icon {
        width: 14px;
        height: 14px;
        display: block;
    }
}
</style>