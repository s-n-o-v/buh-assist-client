<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', to: '/' },
            { label: 'Список клиентов', icon: 'pi pi-fw pi-users', to: '/clients' },
        ],
    },
    {
        label: 'Отчеты',
        items: [
            { label: 'Отчеты по организациям', icon: 'pi pi-fw pi-calculator', to: '/clients' },
            // { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
            // { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            // { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            // { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            // { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            // { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            // { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            // { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
            // { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            // { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            // { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
            // { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/uikit/timeline' },
            // { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        ]
    },
    {
        label: 'Справочники',
        icon: 'pi pi-fw pi-briefcase',
        to: '/',
        items: [
            {
                label: 'Федеральные органы',
                icon: 'pi pi-fw pi-building-columns',
                to: '/organizations'
            },
            {
                label: 'Организации',
                icon: 'pi pi-fw pi-building',
                to: '/tax-offices'
            },
            {
                label: 'Типы отчетов',
                icon: 'pi pi-fw pi-book',
                to: '/tax-reports'
            },
            {
                label: 'Сертификаты',
                icon: 'pi pi-fw pi-id-card',
                to: '/certs'
            },
            {
                label: 'Теги',
                icon: 'pi pi-fw pi-tags',
                to: '/tags'
            },
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <AppMenuItem v-if="!item.separator" :item="item" :index="i" />
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
