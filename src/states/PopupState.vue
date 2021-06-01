<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `PopupState`,
    props: {
        title: {
            type: String,
            default: () => ``
        },
        message: {
            type: String,
            default: () => ``
        },
        opened: {
            type: Boolean,
            default: () => false
        }
    }
};
</script>