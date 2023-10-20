<template>
    <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <Suspense :timeout="0.1" @pending="onPending" @resolve="onResolve" @fallback="fallback">
                <!-- 主要内容 -->
                <component :is="Component"></component>
            </Suspense>
        </template>
    </RouterView>
</template>
<script setup>
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    speed: 0,
    trickleSpeed: 10,
    showSpinner: false,
})
function onPending() {
    NProgress.start();
}

function onResolve() {
    NProgress.done();
}
function fallback() {
}

</script>