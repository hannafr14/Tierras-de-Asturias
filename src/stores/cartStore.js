import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const CART_STORAGE_KEY = 'tierras-cart'

function getStoredCartItems() {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)

    if (!storedCart) {
        return []
    }

    return JSON.parse(storedCart)
}

export const useCartStore = defineStore('cart', () => {
    const items = ref(getStoredCartItems())

    const itemsCount = computed(() => {
        return items.value.length
    })

    function saveCart() {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.value))
    }

    function addToCart(product) {
        const existingItem = items.value.find((item) => {
            return item.id === product.id
        })

        if (existingItem) {
            existingItem.quantity += 1
            saveCart()
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

        saveCart()
    }

    function increaseQuantity(productId) {
        const item = items.value.find((item) => {
            return item.id === productId
        })

        if (!item) {
            return
        }

        item.quantity += 1
        saveCart()
    }

    function decreaseQuantity(productId) {
        const item = items.value.find((item) => {
            return item.id === productId
        })

        if (!item || item.quantity === 1) {
            return
        }

        item.quantity -= 1
        saveCart()
    }

    return {
        items,
        itemsCount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
    }
})