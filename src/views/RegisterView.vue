<script setup>
import AuthLayout from '@/components/auth/AuthLayout.vue';
</script>

<template>
  <AuthLayout>
    <form class="register-form">
      <div class="register-form__header">
        <h2>Crea tu cuenta</h2>
        <p>Registrate para empezar a disfrutar de lo mejor de Asturias.</p>
      </div>

      <label class="register-form__field">
        <span>Nombre</span>
        <input type="text" placeholder="Juan">
      </label>

      <label class="register-form__field">
        <span>Apellidos</span>
        <input type="text" placeholder="Perez">
      </label>

      <label class="register-form__field">
        <span>Correo electronico</span>
        <input type="email" placeholder="nombre@ejemplo.com">
      </label>

      <label class="register-form__field">
        <span>Contrasena</span>
        <input type="password" placeholder="********">
      </label>

      <label class="register-form__field">
        <span>Confirmar</span>
        <input type="password" placeholder="********">
      </label>

      <label class="register-form__terms">
        <input type="checkbox">
        <span>
          Acepto los terminos y condiciones y la politica de privacidad.
        </span>
      </label>

      <button class="register-form__submit" type="button">
        Crear cuenta
      </button>

      <p class="register-form__login">
        ¿Ya tienes cuenta?
        <RouterLink to="/login">Iniciar sesion</RouterLink>
      </p>
    </form>
  </AuthLayout>
</template>

<style scoped lang="scss">
.register-form {
    &__header {
        margin-bottom: 28px;

        h2 {
            margin: 0 0 8px;
            color: #172033;
            font-size: 30px;
            font-weight: 800;
            line-height: 38px;
        }

        p {
            margin: 0;
            color: #4f5a4f;
            font-size: 14px;
            font-weight: 500;
            line-height: 21px;
        }
    }

    &__field {
        display: grid;
        gap: 7px;
        margin-bottom: 17px;

        span {
            color: #273141;
            font-size: 12px;
            font-weight: 700;
            line-height: 16px;
        }

        input {
            width: 100%;
            min-height: 43px;
            padding: 0 14px;
            border: 1px solid #cbd5c6;
            border-radius: 6px;
            color: #172033;
            font-size: 14px;
            outline: none;

            &:focus {
                border-color: #006727;
                box-shadow: 0 0 0 3px rgba(0, 103, 39, 0.12);
            }
        }
    }

    &__terms {
        display: flex;
        gap: 10px;
        margin: 8px 0 26px;
        color: #3f4a3e;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;

        input {
            width: 16px;
            height: 16px;
            margin-top: 1px;
            accent-color: #006727;
            flex: 0 0 auto;
        }
    }

    &__submit {
        width: 100%;
        min-height: 50px;
        border: none;
        border-radius: 6px;
        background: #006727;
        color: #ffffff;
        font-size: 16px;
        font-weight: 800;
        cursor: pointer;

        &:hover {
            background: #00531f;
        }
    }

    &__login {
        margin: 28px 0 0;
        padding-top: 24px;
        border-top: 1px solid #e1e7dd;
        color: #4f5a4f;
        text-align: center;
        font-size: 13px;
        font-weight: 500;

        a {
            color: #006727;
            font-weight: 800;
            text-decoration: none;
        }
    }
}

@media (max-width: 576px) {
  .register-form {
        &__header h2 {
            font-size: 25px;
            line-height: 32px;
        }
    }
}
</style>