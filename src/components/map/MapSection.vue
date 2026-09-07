<script setup>
import { createApp, onBeforeUnmount, onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import FarmCard from '@/components/cards/FarmCard.vue'
import markerIcon from '@/assets/marker-icon-granja.svg'

const mapElement = ref(null)
let map = null
let popupApp = null

const farmPreview = {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    name: 'Quesería del Valle',
    location: 'Cabrales, Asturias',
    tags: ['Quesos'],
}

const updateMapSize = () => {
    if (map) {
        map.invalidateSize()
    }
}

onMounted(() => {
    map = L.map(mapElement.value).setView([43.3619, -5.8494], 8)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

const popupContainer = document.createElement('div')
popupContainer.className = 'map-popup'

popupApp = createApp(FarmCard, {
    image: farmPreview.image,
    name: farmPreview.name,
    location: farmPreview.location,
    tags: farmPreview.tags,
    variant: 'compact',
})

    popupApp.mount(popupContainer)

    const customMarkerIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [46, 46],
        iconAnchor: [23, 23],
        popupAnchor: [0, -23],
    })

    L.marker([43.3502, -4.8442], {
        icon: customMarkerIcon,
    })
        .addTo(map)
        .bindPopup(popupContainer, {
            closeButton: false,
        })

    setTimeout(updateMapSize, 0)
    window.addEventListener('resize', updateMapSize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateMapSize)

    if (popupApp) {
        popupApp.unmount()
        popupApp = null
    }

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

:deep(.leaflet-popup-content-wrapper) {
    padding: 0;
    border-radius: 11px;
    background: transparent;
    box-shadow: none;
}

:deep(.leaflet-popup-content) {
    width: 130px !important;
    margin: 0;
}

:deep(.leaflet-popup-tip) {
    background: #FFFFFF;
}
</style>