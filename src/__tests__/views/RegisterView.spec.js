import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '@/views/RegisterView.vue';

const createTestRouter = () => createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
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

    it('shows errors when submitting an empty form', async () => {
      const router = createTestRouter();

      await router.push('/register');
      await router.isReady();

      const wrapper = mount(RegisterView, {
        global: {
          plugins: [router],
        },
      });

      expect(wrapper.findAll('.register-form__error')).toHaveLength(0);

      await wrapper.get('form').trigger('submit');

      expect(wrapper.get('#first-name-error').text())
        .toBe('Introduce tu nombre.');
      expect(wrapper.get('#last-name-error').text())
        .toBe('Introduce tus apellidos.');
      expect(wrapper.get('#email-error').text())
        .toBe('Introduce tu correo electrónico.');
      expect(wrapper.get('#password-error').text())
        .toBe('Introduce una contraseña.');
      expect(wrapper.get('#confirm-password-error').text())
        .toBe('Confirma tu contraseña.');
      expect(wrapper.get('#terms-error').text())
        .toBe('Debes aceptar los términos y la privacidad.');

      expect(wrapper.get('input[autocomplete="given-name"]')
        .attributes('aria-invalid')).toBe('true');

      wrapper.unmount();
    });

    it('shows an error for an invalid email', async () => {
      const router = createTestRouter();

      await router.push('/register');
      await router.isReady();

      const wrapper = mount(RegisterView, {
        global: {
          plugins: [router],
        },
      });

      await wrapper.get('input[type="email"]').setValue('ana');
      await wrapper.get('form').trigger('submit');

      expect(wrapper.get('#email-error').text())
        .toBe('Introduce un correo electrónico válido.');

      expect(wrapper.get('input[type="email"]')
        .attributes('aria-describedby')).toBe('email-error');

      await wrapper.get('input[type="email"]').setValue('ana@example.com');
      await wrapper.get('form').trigger('submit');

      expect(wrapper.find('#email-error').exists()).toBe(false);
      expect(wrapper.get('input[type="email"]')
        .attributes('aria-invalid')).toBe('false');

      wrapper.unmount();
    });

    it('requires a password of at least 8 characters', async () => {
      const router = createTestRouter();

      await router.push('/register');
      await router.isReady();

      const wrapper = mount(RegisterView, {
        global: {
          plugins: [router],
        },
      });

      const passwordInput = wrapper.findAll('input[type="password"]')[0];

      await passwordInput.setValue('1234567');
      await wrapper.get('form').trigger('submit');

      expect(wrapper.get('#password-error').text())
        .toBe('La contraseña debe tener al menos 8 caracteres.');

      await passwordInput.setValue('12345678');
      await wrapper.get('form').trigger('submit');

      expect(wrapper.find('#password-error').exists()).toBe(false);

      wrapper.unmount();
    });

    it('requires matching password confirmation', async () => {
      const router = createTestRouter();

      await router.push('/register');
      await router.isReady();

      const wrapper = mount(RegisterView, {
        global: {
          plugins: [router],
        },
      });

      const [passwordInput, confirmationInput] =
        wrapper.findAll('input[type="password"]');

      await passwordInput.setValue('password123');
      await confirmationInput.setValue('password456');
      await wrapper.get('form').trigger('submit');

      expect(wrapper.get('#confirm-password-error').text())
        .toBe('Las contraseñas no coinciden.');

      await confirmationInput.setValue('password123');
      await wrapper.get('form').trigger('submit');

      expect(wrapper.find('#confirm-password-error').exists()).toBe(false);

      wrapper.unmount();
    });

    it('requires consent and accepts valid form data', async () => {
      const router = createTestRouter();

      await router.push('/register');
      await router.isReady();

      const wrapper = mount(RegisterView, {
        global: {
          plugins: [router],
        },
      });

      await wrapper.get('input[autocomplete="given-name"]').setValue('Ana');
      await wrapper.get('input[autocomplete="family-name"]').setValue('Garcia');
      await wrapper.get('input[type="email"]').setValue('ana@example.com');

      const [passwordInput, confirmationInput] =
        wrapper.findAll('input[type="password"]');

      await passwordInput.setValue('password123');
      await confirmationInput.setValue('password123');
      await wrapper.get('form').trigger('submit');

      expect(wrapper.findAll('.register-form__error')).toHaveLength(1);
      expect(wrapper.get('#terms-error').text())
        .toBe('Debes aceptar los términos y la privacidad.');

      await wrapper.get('input[type="checkbox"]').setValue(true);
      await wrapper.get('form').trigger('submit');

      expect(wrapper.findAll('.register-form__error')).toHaveLength(0);
      expect(wrapper.findAll('[aria-invalid="true"]')).toHaveLength(0);

      wrapper.unmount();
    });
});