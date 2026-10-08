import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import ProductsPage from '@/views/ProductsPage.vue'

vi.mock('@/services/catalogApi', () => {
    return {
        getProducts: vi.fn(),
        getFarms: vi.fn(),
    }
})

import { getProducts, getFarms } from '@/services/catalogApi'
beforeEach(() => {
    vi.clearAllMocks()

    getProducts.mockResolvedValue([
        {
            id: 1,
            name: 'Queso Gamoneu',
            image: 'https://example.com/queso.jpg',
            farmName: 'Finca La Vara',
            farmAddress: 'Oviedo',
            price: 12.5,
            category: 'Quesos',
            farmId: 10,
        },
        {
            id: 2,
            name: 'Sidra Natural',
            image: 'https://example.com/sidra.jpg',
            farmName: 'Llagar Asturias',
            farmAddress: 'Gijon',
            price: 4.2,
            category: 'Sidra',
            farmId: 11,
        },
    ])

    getFarms.mockResolvedValue([])
})

describe('ProductsPage', () => {
    it('loads and renders products', async () => {
        const wrapper = mount(ProductsPage, {
            global: {
                plugins: [createPinia()],
                stubs: {
                    CatalogLayout: {
                        template: '<div><slot name="content" /><slot name="map" /></div>',
                    },
                    MapSection: true,
                },
            },
        })

        await new Promise((resolve) => {
            setTimeout(resolve, 0)
        })

        expect(getProducts).toHaveBeenCalled()
        expect(wrapper.text()).toContain('Queso Gamoneu')
        expect(wrapper.text()).toContain('Sidra Natural')
        expect(wrapper.text()).toContain('Finca La Vara')
        expect(wrapper.text()).toContain('Llagar Asturias')
    })

    it('filters products by search query', async () => {
        const wrapper = mount(ProductsPage, {
            global: {
                plugins: [createPinia()],
                stubs: {
                    CatalogLayout: {
                        template: '<div><slot name="content" /><slot name="map" /></div>',
                    },
                    MapSection: true,
                },
            },
        })

        await new Promise((resolve) => {
            setTimeout(resolve, 0)
        })

        const searchInput = wrapper.find('input[type="search"]')

        await searchInput.setValue('queso')

        expect(wrapper.text()).toContain('Queso Gamoneu')
        expect(wrapper.text()).not.toContain('Sidra Natural')
    })
})