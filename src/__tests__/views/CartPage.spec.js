import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import CartPage from '@/views/CartPage.vue'
import { useCartStore } from '@/stores/cartStore'

const mountCartPage = () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    return mount(CartPage, {
        global: {
            plugins: [pinia],
            stubs: {
                RouterLink: {
                    props: ['to'],
                    template: '<a><slot /></a>',
                },
            },
        },
    })
}

describe('CartPage', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('renders products stored in the cart', () => {
        const pinia = createPinia()
        setActivePinia(pinia)

        const cartStore = useCartStore()

        cartStore.addToCart({
            id: 1,
            name: 'Queso Gamoneu',
            image: 'https://example.com/queso.jpg',
            farmName: 'Finca La Vara',
            price: 12.5,
        })

        const wrapper = mount(CartPage, {
            global: {
                plugins: [pinia],
                stubs: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a><slot /></a>',
                    },
                },
            },
        })

        expect(wrapper.text()).toContain('Queso Gamoneu')
        expect(wrapper.text()).toContain('Finca La Vara')
        expect(wrapper.text()).toContain('12.5')
    })

    it('loads cart products from localStorage', () => {
        localStorage.setItem(
            'tierras-cart',
            JSON.stringify([
                {
                    id: 1,
                    name: 'Sidra Natural',
                    image: 'https://example.com/sidra.jpg',
                    farmName: 'Llagar Asturias',
                    price: 4.2,
                    quantity: 2,
                },
            ])
        )

        const wrapper = mountCartPage()

        expect(wrapper.text()).toContain('Sidra Natural')
        expect(wrapper.text()).toContain('Llagar Asturias')
        expect(wrapper.text()).toContain('4.2')
    })

    it('renders the empty cart state', () => {
        const wrapper = mountCartPage()

        expect(wrapper.text()).toContain('Tu cesta está vacía.')
    })
})