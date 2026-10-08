import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import GranjasPage from '@/views/GranjasPage.vue'

vi.mock('@/services/catalogApi', () => {
    return {
        getFarms: vi.fn(),
    }
})

import { getFarms } from '@/services/catalogApi'

beforeEach(() => {
    vi.clearAllMocks()

    getFarms.mockResolvedValue([
        {
            id: 1,
            name: 'Finca La Vara',
            address: 'Oviedo',
            image: 'https://example.com/finca.jpg',
            categories: ['Quesos', 'Miel'],
            latitude: 43.36,
            longitude: -5.84,
        },
        {
            id: 2,
            name: 'Llagar Asturias',
            address: 'Gijon',
            image: 'https://example.com/llagar.jpg',
            categories: ['Sidra'],
            latitude: 43.53,
            longitude: -5.66,
        },
    ])
})

describe('GranjasPage', () => {
    it('loads and renders farms', async () => {
        const wrapper = mount(GranjasPage, {
            global: {
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

        expect(getFarms).toHaveBeenCalled()
        expect(wrapper.text()).toContain('Finca La Vara')
        expect(wrapper.text()).toContain('Llagar Asturias')
        expect(wrapper.text()).toContain('Oviedo')
        expect(wrapper.text()).toContain('Gijon')
        expect(wrapper.text()).toContain('Quesos')
        expect(wrapper.text()).toContain('Sidra')
    })

    it('filters farms by search query', async () => {
        const wrapper = mount(GranjasPage, {
            global: {
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

        await searchInput.setValue('llagar')

        expect(wrapper.text()).toContain('Llagar Asturias')
        expect(wrapper.text()).not.toContain('Finca La Vara')
    })
})