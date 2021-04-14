<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `ModalDialogState`,
    props: {
        title: {
            type: String,
            default: () => ``
        }
    },
    data() {
        return {
            opened: false,
            handlers: {
                openedChanged: null
            }
        }
    },
    methods: {
        setOpenedHandler(handler) {
            if (!handler) {
                console.warn(`ModalDialogState.setOpenedHandler: handler is null!`);
                return;
            }

            this.handlers.openedChanged = handler;
        },
        runCallback() {
            if (this.handlers.openedChanged) this.handlers.openedChanged(this.opened);
        },
        open() {
            this.opened = true;

            this.runCallback();

            this.$emit(`opened`);
        },
        close(result) {
            this.opened = false;

            this.runCallback();

            this.$emit(`closed`, result);
        },
        toggle() {
            if (this.opened) {
                this.close();
            } else {
                this.open();
            }
        }
    }
}
</script>
