<template>
    <div class="va-main">
        <nav class="navbar border-bottom">
            <div class="container">
                <div class="navbar-toggle navbar-toggle-left d-md-none" @click="show">
                    <i class="bi bi-list"></i>
                </div>

                <router-link class="navbar-brand me-auto" :to="{ name: 'dashboard' }">
                    <slot name="brand"></slot>
                </router-link>


                <div class="navbar-right" ref="navbarRight">
                    <div class="offcanvas-header d-md-none">
                        <h5 class="offcanvas-title" id="bdSidebarOffcanvasLabel"></h5>
                        <button type="button" class="btn-close" @click="hide()"></button>
                    </div>
                    <slot name="nav"></slot>
                </div>
                <slot name="user">

                </slot>
                <div class="navbar-toggle navbar-toggle-right d-md-none" @click="showRight">
                    <i class="bi bi-three-dots"></i>
                </div>
            </div>
        </nav>
        <div class="wrapper container">

            <div class="left" ref="left">
                <div class="offcanvas-header d-md-none">
                    <h5 class="offcanvas-title" id="bdSidebarOffcanvasLabel"></h5>
                    <button type="button" class="btn-close" @click="hide()"></button>
                </div>
                <ul class="nav nav-sidebar">
                    <template v-for="menu of menus">
                        <li class="nav-item" v-if="menu.children.length" :class="{ 'menu-open': menu.active() }" ref="list">
                            <a href="javascript:void(0)" @click="toggleMenu" class="nav-link"
                                :class="{ 'router-link-active': menu.active() }">
                                <i class="nav-icon" :class="menu.icon"></i>
                                <p>
                                    {{ menu.title }}
                                    <i class="right bi-chevron-left"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item" v-for="sub of menu.children">
                                    <router-link :to="{ name: sub.name }" class="nav-link">
                                        <i class="nav-icon bi bi-empty me-2"></i>
                                        <p>{{ sub.title }}</p>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item" v-else>
                            <router-link :to="{ name: menu.name }" class="nav-link" :name="menu.name"
                                :is-root="menu.name == dashboardName ? true : null">
                                <i class="nav-icon" :class="menu.icon"></i>
                                <p>
                                    {{ menu.title }}
                                </p>
                            </router-link>
                        </li>
                    </template>
                </ul>
            </div>
            <div class="right content py-3">
                <Pending></Pending>
            </div>
            <div class="sidebar-overlay" @click="hide"></div>
        </div>
    </div>
</template>
<script setup>
import { useDark } from '@vueuse/core'
import { inject } from 'vue';
import Pending from './Pending.vue'
import { RootMenuKey, RouterKey } from '../libs/key'

const props = defineProps({
    //从哪个根节点计算子菜单
    rootName: {
        type: String,
        default: 'home'
    }
})
useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
})
useDark({
    selector: 'html',
    attribute: 'data-bs-theme',
    valueDark: 'dark',
    valueLight: 'light',
})

const list = $ref();
const left = $ref();
const navbarRight = $ref()
const router = inject(RouterKey)
const root = inject(RootMenuKey)
const dashboardName = $computed(() => router.getRoutes().find(e => e.name == root).children[0].name)

const menus = $computed(() => {
    const menus = [];
    router.getRoutes().find(e => e.name == root).children.forEach(menu => {
        const { title, name, icon } = menu;
        if (!menu.show) {
            return;
        }

        const menu2 = {
            title,
            name,
            icon,
            children: [],
            active() {
                return !!router.currentRoute.value.matched.find(e => e.name == this.name)
            }
        }
        if (menu.children?.length) {
            menu2.children = menu.children.filter(e => e.show)

            if (menu2.children.length == 1) {
                //如果只有一个带标题的子节点，就没有子菜单
                menu2.children = [];
            }
        }
        if (!menu2.title) {
            return;
        }
        menus.push(menu2)
    })
    return menus
})
router.beforeEach((to, from) => {
    hide()
})

function toggleMenu(e) {
    const li = e.srcElement.offsetParent
    li.classList.toggle('menu-open')
    list.filter(e => e != li).forEach(li => {
        li.classList.remove('menu-open')
    })
}

function show() {
    document.body.classList.add('sidebar-open')
    left.classList.add('open')
}
function showRight() {
    navbarRight.classList.add('open')
    document.body.classList.add('sidebar-open')
}
function hide() {
    if (!left) {
        return;
    }
    left.classList.remove('open')
    navbarRight.classList.remove('open')
    document.body.classList.remove('sidebar-open')
}
</script>
<style>
body.sidebar-open {
    overflow: hidden;
}

:root {
    --va-view-width: 1224px;
}
</style>
<style scoped lang="scss">
@import "../scss/bootstrap.scss";

:deep(.el-dropdown) {
    font-size: inherit;
    line-height: inherit;
}

.container {
    max-width: var(--va-view-width);
    justify-content: flex-start;
}

.bi-empty::after {
    content: 'ㅤ';
}

.nav-sidebar {
    position: relative;

    &:hover {
        overflow: visible;
    }
}

.nav {
    --bs-nav-link-color: var(--bs-navbar-color);
}

.offcanvas-header {
    padding: 16px;
}

.sidebar-overlay {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(var(--bs-body-bg) 0.5);
    z-index: 2000;
}

.sidebar-open .sidebar-overlay {
    display: block;
}

.navbar-toggle-left {
    padding-right: 16px;
}

.navbar-toggle-right {
    padding-left: 16px;
}

.navbar-right {
    @include media-breakpoint-down(md) {
        position: fixed;
        right: 0;
        top: 0;
        height: 100%;
        margin-right: -300px;
        width: 300px;
        z-index: 2001;
        background-color: var(--bs-body-bg);
        transition: margin-right .3s ease-in-out, width .3s ease-in-out;

        &.open {
            margin-right: 0;
            box-shadow: 14px 0 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22) !important;
        }

        :deep(.navbar-nav) {
            flex-direction: column !important;
        }

        .nav-link {
            padding: 8px 16px !important;
        }
    }

}

.nav-sidebar {
    flex-direction: column;

    .nav-item {
        position: relative;

        >.nav-link {
            margin-bottom: .2rem;

            .right {
                //@include transition(transform $transition-fn $transition-speed);
            }
        }
    }

    .nav-link {
        color: rgba(var(--bs-emphasis-color-rgb), 0.65);
        border-radius: 4px;
    }

    .nav-link.router-link-active:not([is-root]),
    .nav-link.router-link-exact-active,
    .nav-link:hover {
        color: rgba(var(--bs-emphasis-color-rgb), 1);
        font-weight: bold;
    }

    .nav-link>.right,
    .nav-link>p>.right {
        position: absolute;
        right: 1rem;
        top: .7rem;
        transition: transform ease-in-out .3s;

        i,
        span {
            margin-left: .5rem;
        }

        &:nth-child(2) {
            right: 2.2rem;
        }
    }

    .menu-open {
        >.nav-treeview {
            display: block;
        }
    }

    .menu-open,
    .menu-is-opening {
        >.nav-link {
            i.right {
                transform: rotate(-90deg);
            }
        }
    }

    // First Level
    >.nav-item {
        margin-bottom: 0;

        .nav-icon {
            margin-left: .05rem;
            font-size: 1rem;
            margin-right: .4rem;
            text-align: center;
        }

        .float-right {
            margin-top: 3px;
        }
    }

    // Tree view menu
    .nav-treeview {
        display: none;
        list-style: none;
        padding: 0;
    }


    .nav-link p {
        display: inline;
        margin: 0;
        white-space: normal;
    }
}

.sidebar-is-opening .sidebar .nav-sidebar {
    .nav-link p {
        animation-name: fadeIn;
        animation-duration: 0.2s;
        animation-fill-mode: both;
    }
}



.navbar {
    justify-content: space-between;

    :deep(.navbar-nav) {
        flex-direction: row;

        .nav-link {
            padding-right: 0.5rem;
            padding-left: 0.5rem;
            position: relative;
        }
    }
}

.wrapper {
    display: flex;
    min-height: calc(100vh - 57px);

    .left {
        width: 200px;
        flex: none;
        transition: margin-left .3s ease-in-out, width .3s ease-in-out;
        background-color: var(--bs-body-bg);
        margin-right:1rem;

        @include media-breakpoint-down(md) {
            position: fixed;
            left: 0;
            top: 0;
            height: 100%;
            margin-left: -300px;
            width: 300px;
            z-index: 2001;

            &.open {
                margin-left: 0;
                box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22) !important;
            }
        }

        .nav-sidebar {
            padding-top: 10px;
        }

    }

    .right {
        flex: auto;
    }
}
</style>
<style>
body,
html {
    height: 100%;
}
</style>