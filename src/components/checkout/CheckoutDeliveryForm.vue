<script setup>
const form = defineModel({
    type: Object,
    required: true,
})
</script>

<template>
    <section class="checkout-delivery-form">
        <h1 class="checkout-delivery-form_title">Información de Entrega</h1>

        <form class="checkout-delivery-form_form">
            <label class="checkout-delivery-form_field">
                <span>Nombre</span>
                <input v-model="form.firstName" type="text" placeholder="Ej. Ana" />
            </label>

            <label class="checkout-delivery-form_field">
                <span>Apellidos</span>
                <input v-model="form.lastName" type="text" placeholder="Ej. García López" />
            </label>

            <label class="checkout-delivery-form_field">
                <span>Ciudad</span>
                <input v-model="form.city" type="text" placeholder="Oviedo" />
            </label>

            <label class="checkout-delivery-form_field">
                <span>Código Postal</span>
                <input v-model="form.postalCode" type="text" placeholder="33001" />
            </label>

            <div class="checkout-delivery-form_address">
                <span class="checkout-delivery-form_address-label">Dirección de Envío</span>

                <label class="checkout-delivery-form_field">
                    <input v-model="form.streetAddress" type="text" placeholder="Calle y número" />
                </label>

                <label class="checkout-delivery-form_field">
                    <input v-model="form.apartment" type="text" placeholder="Piso, puerta ..." />
                </label>
            </div>

            <label class="checkout-delivery-form_field checkout-delivery-form_field--wide">
                <span>Teléfono de Contacto</span>
                <input v-model="form.phone" type="tel" placeholder="+34 600 000 000" />
            </label>
        </form>
    </section>
</template>
<style scoped lang="scss">
.checkout-delivery-form {
    padding: 24px;
    border: 1px solid #DCE3EF;
    border-radius: 8px;
    background: #FFFFFF;

    &_title {
        margin: 0 0 20px;
        color: #111827;
        font-size: 20px;
        font-weight: 700;
        line-height: 28px;
    }

    &_form {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
    }

    &_field {
        display: flex;
        flex-direction: column;
        gap: 6px;

        span {
            color: #3F4A3E;
            font-size: 13px;
            font-weight: 600;
            line-height: 18px;
        }

        input {
            width: 100%;
            height: 42px;
            padding: 0 12px;
            border: 1px solid #BECABA;
            border-radius: 6px;
            background: #FFFFFF;
            color: #111827;
            font-size: 14px;
            line-height: 20px;

            &::placeholder {
                color: #8A9587;
            }

            &:focus {
                border-color: #007A3D;
                outline: none;
            }
        }

        &--wide {
            grid-column: 1 / -1;
        }
    }

    &_address {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 6px 16px;
        grid-column: 1 / -1;
    }

    &_address-label {
        grid-column: 1 / -1;
        color: #3F4A3E;
        font-size: 13px;
        font-weight: 600;
        line-height: 18px;
    }
}

@media (max-width: 768px) {
    .checkout-delivery-form {
        padding: 20px;

        &_form {
            grid-template-columns: 1fr;
        }

        &_field--wide {
            grid-column: auto;
        }

        &_address {
            grid-template-columns: 1fr;
        }
    }
}
</style>