<script setup>
defineProps({
    type: {
        type: String,
        default: 'default',
    },

    message: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <p
        class="state-message"
        :class="`state-message--${type}`"
    >
        {{ message }}
    </p>
</template>

<style scoped lang="scss">
.state-message {
    margin: 28px 0 0;
    color: #3F4A3E;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;

    &--error {
        color: #B42318;
    }

    &--loading {
        color: #6F7A6D;
    }

    &--empty {
        color: #3F4A3E;
    }
}
</style>