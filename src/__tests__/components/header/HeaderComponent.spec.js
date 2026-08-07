import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';
import HeaderComponent from "@/components/header/HeaderComponent.vue";

describe('HeaderComponent', () => {
    it('renders logo and navigation links', () => {
        const wrapper = mount(HeaderComponent);

        expect(wrapper.text()).toContain('Tierras de Asturias');
        expect(wrapper.text()).toContain('Productos');
        expect(wrapper.text()).toContain('Granjas');
    })

    it('renders cart button', () => {
        const wrapper = mount(HeaderComponent);
        const cartButton = wrapper.find('button[aria-label="Carrito"]');

        expect(cartButton.exists()).toBe(true);
    })

    it('shows Granjas as active by default', () => {
        const wrapper = mount(HeaderComponent);
        const links = wrapper.findAll('.header_nav a');
        const granjasLink = links.find((link) => link.text() === 'Granjas');

        expect(granjasLink.classes()).toContain('active');
    })

    it('changes active link when Products is clicked', async () => {
        const wrapper = mount(HeaderComponent);
        const links = wrapper.findAll('.header_nav a');
        const productsLink = links.find((link) => link.text() === 'Productos');
        const granjasLink = links.find((link) => link.text()  === 'Granjas');

        await productsLink.trigger('click');

        expect(productsLink.classes()).toContain('active');
        expect(granjasLink.classes()).not.toContain('active');
    })

    it('renders account button when user is authenticated', () => {
        const wrapper = mount(HeaderComponent);

        expect(wrapper.text()).toContain('Mi Cuenta');
        expect(wrapper.find('.header_avatar').exists()).toBe(true);
    })

    it('changes active link back to Granjas when Granjas is clicked', async () => {
        const wrapper = mount(HeaderComponent)
        const links = wrapper.findAll('.header_nav a')
        const productsLink = links.find((link) => link.text() === 'Productos')
        const granjasLink = links.find((link) => link.text() === 'Granjas')

        await productsLink.trigger('click')
        await granjasLink.trigger('click')

        expect(granjasLink.classes()).toContain('active')
        expect(productsLink.classes()).not.toContain('active')
    })
})