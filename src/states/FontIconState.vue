<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `FontIconState`,
    props: {
        group: {
            type: String,
            default: () => ``
        },
        id: {
            type: String,
            default: () => ``
        },
        size: {
            type: String,
            default: () => `16px`
        }
    }
};
</script>