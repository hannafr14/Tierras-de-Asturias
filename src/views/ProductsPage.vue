<script setup>
import { ref } from 'vue';
import CatalogLayout from '@/components/catalog/CatalogLayout.vue';
import CategoryFilter from '@/components/catalog/CategoryFilter.vue';
import CatalogTabs from '@/components/catalog/CatalogTabs.vue';
import SearchBar from '@/components/catalog/SearchBar.vue';
import FiltersButton from '@/components/catalog/FiltersButton.vue';
import ProductCard from '@/components/cards/ProductCard.vue';
import MapSection from '@/components/map/MapSection.vue';

const categories = ['Todos', 'Quesos', 'Sidra', 'Miel', 'Verduras', 'Carnes', 'Frutos', 'Salchichas'];
const activeCategory = ref('Todos');
const searchQuery = ref('');
const productPreview = {
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862',
    name: 'Queso Cabrales',
    farmName: 'Quesería del Valle',
    location: 'Cabrales, Asturias',
    price: '14,50€',
}
</script>

<template>
    <CatalogLayout>
        <template #content>
            <section class="catalog-page">
                <CatalogTabs />
                
                <div class="catalog-page_header">
                    <h1 class="catalog-page_title">Productos locales de Asturias</h1>
                    <p class="catalog-page_description">
                        Descubre alimentos frescos directamente de granjas asturianas.
                    </p>
                </div>

                <div class="catalog-page_categories">
                    <CategoryFilter
                        :categories="categories"
                        :active-category="activeCategory"
                        @select="activeCategory = $event"
                    />
                </div>
                
                <div class="catalog-page_toolbar">
                    <SearchBar
                        v-model="searchQuery"
                        placeholder="Buscar productos"
                    />

                    <FiltersButton />
                </div>

                <div class="catalog-page_list">
                    <ProductCard
                        :image="productPreview.image"
                        :name="productPreview.name"
                        :farm-name="productPreview.farmName"
                        :location="productPreview.location"
                        :price="productPreview.price"
                    />
                </div>
            </section>
        </template>

        <template #map>
            <MapSection />
        </template>
    </CatalogLayout>
</template>
<style scoped lang="scss">
.catalog-page {
    &_header {
        margin-bottom: 28px;
    }

    &_title {
        margin: 0 0 8px;
        color: #111827;
        font-size: 28px;
        font-weight: 700;
        line-height: 36px;
    }

    &_description {
        margin: 0;
        color: #3F4A3E;
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
    }

    &_categories {
        min-width: 0;
        max-width: 100%;
        margin-bottom: 22px;
        overflow: hidden;
    }

    &_toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
    }

    &_list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
        margin-top: 28px;
    }
}

@media (max-width: 576px) {
    .catalog-page {
        width: 100%;
        max-width: 100%;
        min-width: 0;

        &_header {
            margin-bottom: 16px;
        }

        &_title {
            font-size: 20px;
            line-height: 26px;
            margin-bottom: 6px;
        }

        &_description {
            font-size: 12px;
            line-height: 18px;
        }

        &_categories {
            margin-bottom: 16px;
        }

        &_toolbar {
            gap: 8px;
            margin-bottom: 18px;
        }

        &_list {
            grid-template-columns: repeat(2, minmax(0, 190px));
            justify-content: space-between;
            gap: 12px;
        }
    }
}
</style>