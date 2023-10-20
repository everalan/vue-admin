<template>
    <div class="row">
        <label class="col-md-2 col-form-label" v-if="label" :class="{required, 'col-md-2': direction=='horizontal'}">{{ label }}</label>
        <el-form-item class="col" :prop="prop">
            <slot/>
        </el-form-item>
    </div>
</template>
<script setup>

//如果想垂直分布，在上级 class="direction-vertical"
defineProps({
    label: {
        type: String,
    },
    prop: {
       type: String,
       default: ''
    },
    required: {
        type: Boolean,
        default: false,
    },
    rules: {
        type: Array,
        default: [],
    },
    direction: {
        type: String,
        default: 'horizontal',//vertical
    }
})
</script>