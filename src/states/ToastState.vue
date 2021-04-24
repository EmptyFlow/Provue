<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `ToastState`,
    props: {
        title: {
            type: String,
            default: () => ``
        },
        message: {
            type: String,
            default: () => ``
        },
        autoCloseTimeout: {
            type: Number,
            default: () => -1
        },
        position: {
            type: String,
            default: () => `rightbottom`
        }
    },
    data() {
        return {
            handlers: {
                opened: null,
                closed: null
            }
        }
    },
    methods: {
        open() {
            if (this.handlers.opened) this.handlers.opened();

            this.$emit(`opened`);
        },
        close() {
            if (this.handlers.closed) this.handlers.closed();

            this.$emit(`closed`);
        }
    }
};
</script>