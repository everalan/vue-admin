<template>
    <Main>
        <template #brand>
            <img src="../img/logo.png" alt="Logo" height="24" class="d-inline-block align-text-top">
            社交媒体管理
        </template>
        <template #user>
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <el-dropdown>
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            媒体管理员
                        </a>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>Action 1</el-dropdown-item>
                                <el-dropdown-item>Action 2</el-dropdown-item>
                                <el-dropdown-item>Action 3</el-dropdown-item>
                                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                                <el-dropdown-item divided>Action 5</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </li>
            </ul>
        </template>
    </Main>
</template>
<script setup>
import Main from '../components/Main.vue';
import { provide } from 'vue';
import { RootMenuKey } from '../libs/key';

provide(RootMenuKey, 'social')
</script>