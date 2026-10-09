import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import CheckoutPage from '@/views/CheckoutPage.vue'
import { useCartStore } from '@/stores/cartStore'

const mountCheckoutPage = () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    return mount(CheckoutPage, {
        global: {
            plugins: [pinia],
            stubs: {
                RouterLink: {
                    props: ['to'],
                    template: '<a :href="to"><slot /></a>',
                },
            },
        },
    })
}

describe('CheckoutPage', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('renders checkout page with cart products', () => {
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

        const wrapper = mount(CheckoutPage, {
            global: {
                plugins: [pinia],
                stubs: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a :href="to"><slot /></a>',
                    },
                },
            },
        })

        expect(wrapper.text()).toContain('Información de Entrega')
        expect(wrapper.text()).toContain('Pago seguro')
        expect(wrapper.text()).toContain('Resumen del pedido')
        expect(wrapper.text()).toContain('Queso Gamoneu')
        expect(wrapper.text()).toContain('Confirmar y pagar')
    })

    it('renders empty checkout state when the cart is empty', () => {
        const wrapper = mountCheckoutPage()

        expect(wrapper.text()).toContain('Tu cesta está vacía.')
        expect(wrapper.text()).toContain('Añade productos antes de continuar con el pago.')
        expect(wrapper.text()).toContain('Ver productos')
        expect(wrapper.find('.checkout-page_empty-link').attributes('href')).toBe('/productos')
        expect(wrapper.find('.order-summary_button').exists()).toBe(false)
    })
})