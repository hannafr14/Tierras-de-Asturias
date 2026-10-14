import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '@/views/RegisterView.vue';

const createTestRouter = () => createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: { template: '<div>Login</div>' },
    },
  ],
});

describe('RegisterView', () => {
    it('renders the registration page content', async () => {
        const router = createTestRouter();

        router.push('/register');
        await router.isReady();

        const wrapper = mount(RegisterView, {
        global: {
            plugins: [router],
        },
        });

        expect(wrapper.text()).toContain('Crea tu cuenta');
        expect(wrapper.text()).toContain('Registrate para empezar a disfrutar de lo mejor de Asturias.');
        expect(wrapper.text()).toContain('Nombre');
        expect(wrapper.text()).toContain('Apellidos');
        expect(wrapper.text()).toContain('Correo electronico');
        expect(wrapper.text()).toContain('Contrasena');
        expect(wrapper.text()).toContain('Confirmar');
        expect(wrapper.text()).toContain('Acepto los terminos y condiciones');
        expect(wrapper.text()).toContain('Crear cuenta');
        expect(wrapper.text()).toContain('Productos locales, directamente de nuestras granjas.');
    });
});