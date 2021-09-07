<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `PanelState`,
    props: {
        title: {
            type: String,
            default: () => ``
        },
        showHeader: {
            type: Boolean,
            default: () => false
        },
        actions: {
            type: Array,
            default: () => []
        }
    }
};
</script>