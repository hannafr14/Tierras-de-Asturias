<script setup>
import HeaderComponent from './components/header/HeaderComponent.vue';
import FooterComponent from './components/footer/FooterComponent.vue';
</script>

<template>
  <HeaderComponent/>
  
  <main class="app-main">
    <RouterView />
    <FooterComponent />
  </main>
</template>

<style scoped lang="scss">
.app-main {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
