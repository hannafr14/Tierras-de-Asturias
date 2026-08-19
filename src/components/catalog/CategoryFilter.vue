<script setup>
    defineProps({
        categories: {
            type: Array,
            required: true,
        },
        activeCategory: {
            type: String,
            required: true,
        },
    })
    const emit = defineEmits(['select'])
</script>

<template>
    <div class="category-filter">
        <button
            v-for="category in categories"
            :key="category"
            class="category-filter_button"
            :class="{ active: category === activeCategory }"
            type="button"
            @click="emit('select', category)"
        >
            {{ category }}
        </button>
    </div>    
</template>

<style scoped lang="scss">
.category-filter {
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    &_button {
        flex: 0 0 auto;
        padding: 5px 14px;
        border: 1px solid #BECABA;
        border-radius: 999px;
        background: #E9EEFC;
        color: #3F4A3E;
        font-size: 12px;
        font-weight: 600;
        line-height: 17px;
        cursor: pointer;

        &.active {
            border-color: #007A3D;
            background: #007A3D;
            color: #FFFFFF;
        }

        &:focus-visible {
            outline: 2px solid rgba(0, 122, 61, 0.35);
            outline-offset: 2px;
        }
    }
}

@media (max-width: 768px) {
    .category-filter {
        gap: 8px;

        &_button {
            padding: 6px 14px;
            font-size: 12px;
            line-height: 17px;
        }
    }
}

@media (max-width: 576px) {
    .category-filter {
        gap: 6px;

        &_button {
            padding: 5px 10px;
            font-size: 10px;
            line-height: 14px;
        }
    }
}
</style>