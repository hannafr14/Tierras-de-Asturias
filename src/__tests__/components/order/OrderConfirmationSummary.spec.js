import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import OrderConfirmationSummary from '@/components/order/OrderConfirmationSummary.vue'

describe('OrderConfirmationSummary', () => {
    it('renders order confirmation data', () => {
        const wrapper = mount(OrderConfirmationSummary, {
            props: {
                orderNumber: 'ORD-123',
                date: '12 oct 2026',
                total: '32,30 €',
            },
        })

        expect(wrapper.text()).toContain('ORD-123')
        expect(wrapper.text()).toContain('12 oct 2026')
        expect(wrapper.text()).toContain('32,30 €')
    })
})