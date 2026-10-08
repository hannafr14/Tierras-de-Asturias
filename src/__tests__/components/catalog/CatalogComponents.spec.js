import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SearchBar from '@/components/catalog/SearchBar.vue'
import CategoryFilter from '@/components/catalog/CategoryFilter.vue'
import FiltersButton from '@/components/catalog/FiltersButton.vue'
import CatalogLayout from '@/components/catalog/CatalogLayout.vue'

describe('Catalog components', () => {
    it('emits the search value when typing in SearchBar', async () => {
        const wrapper = mount(SearchBar, {
            props: {
                modelValue: '',
                placeholder: 'Buscar productos',
            },
        })

        const input = wrapper.find('input[type="search"]')

        await input.setValue('queso')

        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['queso'])
    })

    it('emits the selected category when clicking a category', async () => {
        const wrapper = mount(CategoryFilter, {
            props: {
                categories: ['Todos', 'Quesos', 'Sidra'],
                activeCategory: 'Todos',
            },
        })

        const buttons = wrapper.findAll('button')

        await buttons[1].trigger('click')

        expect(wrapper.emitted('select')[0]).toEqual(['Quesos'])
    })

    it('marks the active category', () => {
        const wrapper = mount(CategoryFilter, {
            props: {
                categories: ['Todos', 'Quesos', 'Sidra'],
                activeCategory: 'Quesos',
            },
        })

        const activeButton = wrapper.find('.category-filter_button.active')

        expect(activeButton.text()).toBe('Quesos')
    })

    it('emits click when FiltersButton is clicked', async () => {
        const wrapper = mount(FiltersButton)

        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('renders content and map slots in CatalogLayout', () => {
        const wrapper = mount(CatalogLayout, {
            slots: {
                content: '<div data-test="content">Products</div>',
                map: '<div data-test="map">Map</div>',
            },
        })

        expect(wrapper.find('[data-test="content"]').text()).toBe('Products')
        expect(wrapper.find('[data-test="map"]').text()).toBe('Map')
    })
})