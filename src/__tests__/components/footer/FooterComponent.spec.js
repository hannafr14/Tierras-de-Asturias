import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FooterComponent from '@/components/footer/FooterComponent.vue';

describe('FooterComponent', () => {
    it('renders footer title', () => {
        const wrapper = mount(FooterComponent);

        expect(wrapper.text()).toContain('Tierras de Asturias');
    })

    it('renders copyright text', () => {
        const wrapper = mount(FooterComponent);

        expect(wrapper.text()).toContain('2026');
        expect(wrapper.text()).toContain('Tierras de Asturias');
    })

    it('has footer class', () => {
        const wrapper = mount(FooterComponent);

        expect(wrapper.find('.footer').exists()).toBe(true);
    })

    it('renders title and text elements', () => {
        const wrapper = mount(FooterComponent);

        expect(wrapper.find('.footer_title').exists()).toBe(true);
        expect(wrapper.find('.footer_text').exists()).toBe(true);
    })
})