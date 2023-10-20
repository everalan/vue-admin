<template>
    <Pending></Pending>
</template>
<script setup>
import { RouterKey } from './libs/key'
import { provide } from 'vue'
import { useRouter } from 'vue-router';
import Pending from './components/Pending.vue'

const router = useRouter()
provide(RouterKey, router)

</script>