import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import MapSection from '@/components/map/MapSection.vue'

const markerMocks = []

vi.mock('leaflet', () => {
  return {
    default: {
      map: vi.fn(() => ({
        setView: vi.fn().mockReturnThis(),
        invalidateSize: vi.fn(),
        remove: vi.fn(),
        getZoom: vi.fn(() => 8),
      })),
      tileLayer: vi.fn(() => ({
        addTo: vi.fn(),
      })),
      layerGroup: vi.fn(() => ({
        addTo: vi.fn().mockReturnThis(),
        clearLayers: vi.fn(),
      })),
      icon: vi.fn((options) => options),
      marker: vi.fn((coordinates, options) => {
        const marker = {
          coordinates,
          options,
          addTo: vi.fn().mockReturnThis(),
          bindPopup: vi.fn().mockReturnThis(),
          openPopup: vi.fn(),
          getLatLng: vi.fn(() => coordinates),
        }

        markerMocks.push(marker)

        return marker
      }),
    },
  }
})

vi.mock('@/assets/marker-icon-granja.svg', () => ({
  default: 'marker-icon.svg',
}))

describe('MapSection', () => {
  beforeEach(() => {
    markerMocks.length = 0
  })

  it('renders one marker for each farm with coordinates', () => {
    mount(MapSection, {
      props: {
        farms: [
          {
            id: 1,
            name: 'Finca La Vara',
            address: 'Oviedo',
            image: 'finca.jpg',
            latitude: 43.36,
            longitude: -5.84,
            categories: ['Quesos'],
          },
          {
            id: 2,
            name: 'Granja Norte',
            address: 'Gijon',
            image: 'granja.jpg',
            latitude: 43.53,
            longitude: -5.66,
            categories: ['Miel'],
          },
        ],
      },
    })

    expect(markerMocks).toHaveLength(2)
    expect(markerMocks[0].coordinates).toEqual([43.36, -5.84])
    expect(markerMocks[1].coordinates).toEqual([43.53, -5.66])
  })

  it('opens the selected farm marker popup', async () => {
    const wrapper = mount(MapSection, {
      props: {
        farms: [
          {
            id: 1,
            name: 'Finca La Vara',
            address: 'Oviedo',
            image: 'finca.jpg',
            latitude: 43.36,
            longitude: -5.84,
            categories: ['Quesos'],
          },
        ],
      },
    })

    await wrapper.setProps({ selectedFarmId: 1 })

    expect(markerMocks[0].openPopup).toHaveBeenCalled()
  })
})