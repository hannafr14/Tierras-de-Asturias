<script setup></script>
<template>
    <footer class="footer">
        <h2 class="footer_title">Tierras de Asturias</h2>
        <p class="footer_text">
            © 2026 Tierras de Asturias. Artesanía y Tierra.
        </p>
    </footer>
</template>
<style scoped lang="scss">
.footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 35px;
    height: 94px;
    background: #273141;
    color: #F9F9FF;
    gap: 6px;

    &_title {
        margin: 0;
        font-size: 21px;
        font-weight: 600;
        line-height: 27px;
    }

    &_text {
        margin: 0;
        font-size: 12px;
        font-weight: 600;
        line-height: 17px;
        color: #D9E3F9;
    }
}

@media (max-width: 576px) {
    .footer {
        height: auto;
        min-height: 76px;
        padding: 16px 14px;
        gap: 4px;

        &_title {
            font-size: 16px;
            line-height: 22px;
        }

        &_text {
            font-size: 10px;
            line-height: 15px;
        }
    }
}
</style>
