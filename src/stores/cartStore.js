import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])

    const itemsCount = computed(() => {
        return items.value.reduce((total, item) => {
            return total + item.quantity
        }, 0)
    })

    return {
        items,
        itemsCount,
    }
})