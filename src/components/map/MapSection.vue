<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapElement = ref(null)
let map = null

onMounted(() => {
    map = L.map(mapElement.value).setView([43.3619, -5.8494], 8)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)
})

onBeforeUnmount(() => {
    if (map) {
        map.remove()
        map = null
    }
})
</script>

<template>
    <section class="map-section">
        <div ref="mapElement" class="map-section_map"></div>
    </section>
</template>

<style scoped lang="scss">
.map-section {
    width: 100%;
    height: 100%;
    min-height: 360px;

    &_map {
        width: 100%;
        height: 100%;
        min-height: 360px;
    }
}
</style>