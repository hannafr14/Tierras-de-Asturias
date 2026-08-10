<script setup>
import HeaderComponent from './components/header/HeaderComponent.vue';
import FooterComponent from './components/footer/FooterComponent.vue';
</script>

<template>
  <HeaderComponent/>
  
  <main>
    <RouterView />
  </main>

  <FooterComponent />
</template>

<style scoped></style>
