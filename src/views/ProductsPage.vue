<script setup>
import { ref } from 'vue';
import CatalogLayout from '@/components/catalog/CatalogLayout.vue';
import CategoryFilter from '@/components/catalog/CategoryFilter.vue';
import CatalogTabs from '@/components/catalog/CatalogTabs.vue';
import SearchBar from '@/components/catalog/SearchBar.vue'

const categories = ['Todos', 'Quesos', 'Sidra', 'Miel', 'Verduras', 'Carnes', 'Frutos', 'Salchichas'];
const activeCategory = ref('Todos');
const searchQuery = ref('');
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
                
                <SearchBar
                    v-model="searchQuery"
                    placeholder="Buscar productos"
                />
            </section>
        </template>

        <template #map>
            <div>Map section</div>
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
}

@media (max-width: 576px) {
    .catalog-page {
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
    }
}
</style>