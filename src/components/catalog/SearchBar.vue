<script setup>
import searchIcon from '@/assets/search.svg'

    defineProps({
        modelValue: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: 'Buscar',
        },
    })

    const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <label class="search-bar">
        <img
            class="search-bar_icon"
            :src="searchIcon"
            alt=""
        >

        <input
            class="search-bar_input"
            type="search"
            :value="modelValue"
            :placeholder="placeholder"
            @input="emit('update:modelValue', $event.target.value)"
        >
    </label>
</template>

<style scoped lang="scss">
.search-bar {
    width: 100%;
    max-width: 270px;
    height: 36px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    border: 1px solid #BECABA;
    border-radius: 6px;
    background: #FFFFFF;

    &:focus-within {
        border-width: 1.5px;
    }

    &_icon {
        flex: 0 0 auto;
        color: #6F7A6D;
        width: 16px;
        height: 16px;
        display: block;
    }

    &_input {
        width: 100%;
        min-width: 0;
        border: none;
        outline: none;
        background: transparent;
        color: #6B7280;
        font-size: 14px;
        font-weight: 500;

        &::placeholder {
            color: #6B7280;
        }
    }

    .search-bar_input {
        &::-webkit-search-cancel-button {
            appearance: none;
            display: none;
        }
    }
}
</style>