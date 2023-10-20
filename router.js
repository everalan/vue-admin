import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import TestIndexPage from './pages/TestIndexPage.vue'
import TestDetailPage from './pages/TestDetailPage.vue'
import Main from './pages/TestMainPage.vue'
import Main2 from './pages/TestMainPage2.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Main,
            name: 'home',
            redirect: {
                name: 'dashboard',
            },
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    title: '首页',
                    icon: 'bi bi-speedometer2',
                    show: true,
                    component: TestIndexPage,
                },
                {
                    path: 'translators',
                    icon: 'bi bi-translate',
                    show: true,
                    title: '翻译',
                    name: '_translators',
                    redirect: {
                        name: 'translators'
                    },
                    children: [
                        {
                            path: '',
                            name: 'translators',
                            title: '翻译总览',
                            show: true,
                            component: TestIndexPage,
                        },
                        {
                            path: 'abc',
                            title: '语言管理',
                            show: true,
                            name: 'translator2',
                            component: TestIndexPage,
                        },
                        {
                            path: ':id',
                            name: 'translator.show',
                            title: '翻译详情',
                            component: TestIndexPage,
                        },
                    ],
                },
                {
                    path: 'hot',
                    name: 'hot',
                    title: '热点事件',
                    show: true,
                    icon: 'bi-fire',
                    component: TestIndexPage,
                },
                {
                    path: 'social',
                    name: 'gotoSocial',
                    title: '社交媒体',
                    show: true,
                    icon: 'bi-people',
                    redirect:{
                        name: 'social'
                    }
                },

            ],
        },
        {
            path: '/social2',
            component: Main2,
            name: 'social',
            redirect: {
                name: 'dashboard2',
            },
            children: [
                {
                    path: '',
                    name: 'dashboard2',
                    title: '社交媒体首页',
                    icon: 'bi-speedometer2',
                    show: true,
                    component: TestIndexPage,
                },
                {
                    path: 'local',
                    icon: 'bi-translate',
                    show: true,
                    title: '国内',
                    name: '_local',
                    redirect: {
                        name: 'mainland'
                    },
                    children: [
                        {
                            path: 'mainland',
                            name: 'mainland',
                            title: '大陆',
                            show: true,
                            component: TestIndexPage,
                        },
                        {
                            path: 'gat',
                            title: '港澳台',
                            show: true,
                            name: 'gat',
                            component: TestIndexPage,
                        },
                    ],
                },
                {
                    path: 'abroad',
                    name: 'abroad',
                    title: '国外',
                    show: true,
                    icon: 'bi-fire',
                    component: TestIndexPage,
                },
                {
                    path: 'gotoHome',
                    name: 'gotoHome',
                    title: '返回首页',
                    show: true,
                    icon: 'bi-arrow-left',
                    redirect:{
                        name: 'home'
                    }
                },
            ],
        }
    ],
})
