<script>
export default {
    name: 'TabContent',
    props: {
        selected: { type: Boolean, required: false, default: false }
    }
}
</script>
<template>
    <div v-show="selected">
        <slot></slot>
    </div>
</template>