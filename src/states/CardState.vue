<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `CardState`,
    props: {
        title: {
            type: String,
            default: () => ``
        },
        message: {
            type: String,
            default: () => ``
        },
        imageUrl: {
            type: String,
            default: () => ``
        },
        imageAlt: {
            type: String,
            default: () => ``
        }
    }
};
</script>