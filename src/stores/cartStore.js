import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])

    const itemsCount = computed(() => {
        return items.value.reduce((total, item) => {
            return total + item.quantity
        }, 0)
    })

    function addToCart(product) {
        const existingItem = items.value.find((item) => {
            return item.id === product.id
        })

        if (existingItem) {
            existingItem.quantity += 1
            return
        }

        items.value.push({
            id: product.id,
            name: product.name,
            image: product.image,
            farmName: product.farmName,
            price: product.price,
            quantity: 1,
        })
    }

    return {
        items,
        itemsCount,
        addToCart,
    }
})