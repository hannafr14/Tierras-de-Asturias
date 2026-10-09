import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
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
        vi.restoreAllMocks()
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

    it('creates an order with valid delivery data', async () => {
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

        const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({
                id: 1,
                orderNumber: 'ORD-1',
                status: 'PENDING',
                total: 12.5,
            }),
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

        const inputs = wrapper.findAll('input')

        await inputs[0].setValue('Ana')
        await inputs[1].setValue('Garcia')
        await inputs[2].setValue('Oviedo')
        await inputs[3].setValue('33001')
        await inputs[4].setValue('Calle Mayor 12')
        await inputs[6].setValue('+34 600 000 000')

        await wrapper.find('.order-summary_button').trigger('click')

        expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    it('shows an error when required delivery fields are empty', async () => {
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

        const fetchMock = vi.spyOn(globalThis, 'fetch')

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

        await wrapper.find('.order-summary_button').trigger('click')

        expect(wrapper.text()).toContain('Completa los datos de entrega antes de continuar.')
        expect(fetchMock).not.toHaveBeenCalled()
    })

    it('shows errors for invalid postal code and phone number', async () => {
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

        const fetchMock = vi.spyOn(globalThis, 'fetch')

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

        const inputs = wrapper.findAll('input')

        await inputs[0].setValue('Ana')
        await inputs[1].setValue('Garcia')
        await inputs[2].setValue('Oviedo')
        await inputs[3].setValue('33')
        await inputs[4].setValue('Calle Mayor 12')
        await inputs[6].setValue('+34 600 000 000')

        await wrapper.find('.order-summary_button').trigger('click')

        expect(wrapper.text()).toContain('Introduce un código postal válido de 5 dígitos.')
        expect(fetchMock).not.toHaveBeenCalled()

        await inputs[3].setValue('33001')
        await inputs[6].setValue('123')

        await wrapper.find('.order-summary_button').trigger('click')

        expect(wrapper.text()).toContain('Introduce un teléfono válido.')
        expect(fetchMock).not.toHaveBeenCalled()
    })
})