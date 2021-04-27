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
                openedChanged: null
            }
        }
    },
    methods: {
        setOpenedHandler(handler) {
            if (!handler) {
                console.warn(`ToastState.setOpenedHandler: handler is null!`);
                return; 
            }

            this.handlers.openedChanged = handler;
        },
        runCallback() {
            if (this.handlers.openedChanged) this.handlers.openedChanged(this.opened);
        },
        open() {
            if (this.handlers.openedChanged) this.handlers.openedChanged(true);

            this.$emit(`opened`);
        },
        close() {
            if (this.handlers.closed) this.handlers.openedChanged(false);

            this.$emit(`closed`);
        }
    }
};
</script>