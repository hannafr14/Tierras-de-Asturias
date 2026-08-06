<script setup>
import { ref } from 'vue';
import carritoIcon from '@/assets/carrito.svg';
import userDefaultIcon from '@/assets/user-default.svg';

const activeMenu = ref('granjas');
const isAuth = true;

const user = {
    name: 'Mi Cuenta',
    avatar: ''
}
</script>

<template>
    <header class="header">
        <a class="header_logo" href="/">
            Tierras de Asturias
        </a>

        <nav class="header_nav">
            <a 
                href="#"
                :class="{ active: activeMenu === 'productos'}"
                @click.prevent="activeMenu = 'productos'"
            >
                Productos
            </a>

            <a 
                href="#"
                :class="{ active: activeMenu === 'granjas'}"
                @click.prevent="activeMenu = 'granjas'"
            >
                Granjas
            </a>
        </nav>

        <div class="header_actions">
            <button class="header_icon" type="button" aria-label="Carrito">
                <img :src="carritoIcon" alt="Carrito">
            </button>

            <button 
                v-if="isAuth"               
                class="header_account"
                type="button"
            >
                <img
                    class="header_avatar"
                    :src="user.avatar || userDefaultIcon"
                    alt="Avatar"
                >
                <span>{{ user.name }}</span>
            </button>

            <button
                v-else
                class="header_login"
                type="button"
            >
                Iniciar sesión
            </button>
        </div>
    </header>
</template>

<style scoped lang="scss">
.header {
    height: 59px;
    display: flex;
    align-items: center;
    padding: 0 35px;
    background: #F9F9FF;
    gap: 26px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

    &_logo {
        color: #006727;
        font-size: 21px;
        font-weight: 700;
        text-decoration: none;
        white-space: nowrap;
        line-height: 27px;
    }

    &_nav {
        display: flex;
        align-items: center;
        gap: 28px;

        a {
            color: #3F4A3E;
            font-size: 14px;
            font-weight: 600;
            line-height: 21px;
            text-decoration: none;
        

            &:hover {
                color: #006727;
            }

            &.active {
                color: #006727;
                font-weight: 700;
                padding-bottom: 3px;
                border-bottom: 2px solid #006727;
            }
        }
    }

    &_actions {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    &_icon {
        width: 36px;
        height: 36px;
        padding: 7px;
        border: none;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 18px;
            height: 18px;
            display: block;
        }
    }

    &_account {
        display: flex;
        align-items: center;
        border: none;
        background: transparent;
        color: #3F4A3E;
        font-size: 12px;
        font-weight: 600;
        line-height: 17px;
        cursor: pointer;
    }

    &_avatar {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 8px;
    }

    &_login {
        padding: 7px 18px;
        border: none;
        border-radius: 999px;
        background: #006727;
        color: #ffffff;
        font-size: 12px;
        font-weight: 700;
        line-height: 17px;
        cursor: pointer;
    }
}

@media (max-width: 768px) {
    .header {
        padding: 0 20px;
        gap: 18px;

        &_logo {
            font-size: 18px;
            line-height: 24px;
        }

        &_nav {
            gap: 18px;

            a {
                font-size: 13px;
            }
        }

        &_actions {
            gap: 6px;
        }
    }
}

@media (max-width: 576px) {
    .header {
        height: 44px;
        padding: 0 12px;
        gap: 12px;

        &_logo {
            font-size: 17px;
        }

        &_nav {
            display: none;
        }

        &_actions {
            gap: 4px;
        }

        &_icon {
            width: 28px;
            height: 28px;
            padding: 0;    

            img {
                width: 18px;
                height: 18px;
            }
        }

        &_account {
            width: 28px;
            height: 28px;
            padding: 5px;

            span {
                display: none;
            }
        }

        &_avatar {
            width: 18px;
            height: 18px;
            margin-right: 0;
        }

        &_login {
            padding: 6px 12px;
            font-size: 11px;
            line-height: 14px;
        }
    }
}
</style>
