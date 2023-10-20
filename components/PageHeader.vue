<template>
    <el-page-header class="pb-3">
        <template #breadcrumb>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: menu.name}" v-for="menu of menus">
                    {{ menu.title }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </template>
        <template #content>
            <slot></slot>
        </template>
        <template #extra>
            <slot name="extra"></slot>
        </template>
    </el-page-header>
</template>
<script setup>
import { inject } from 'vue';
import { RouterKey, RootMenuKey } from '../libs/key';

const router = inject(RouterKey)
const root = inject(RootMenuKey)

const menus = $computed(() => {
    return router.currentRoute.value.matched.map(e => {
        let name = e.name
        const dashboardName = router.getRoutes().find(f => f.name == root).children[0].name
        if(name == dashboardName){
            return;
        }
        if(name == root){
            name = dashboardName
        }
        for(const m of router.getRoutes()){
            const menu = m.children.find(f => f.name == name)
            if(menu?.title){
                return menu;
            }
        }
    }).filter(e => e)
})
</script>
<style scoped>
:deep(.el-page-header__back) {
    display: none;
}

:deep(.el-page-header__left>.el-divide)r {
    display: none;
}

:deep(.el-page-header__main) {
    display: none;
}

:deep(.el-breadcrumb__inner a),
:deep(.el-breadcrumb__inner.is-link) {
    font-weight: 400;
}
</style>