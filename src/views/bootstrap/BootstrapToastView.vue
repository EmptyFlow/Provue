<template>
    <div
        class="position-fixed bottom-0 end-0 p-3"
        style="z-index: 1">
        <div
            ref="toast"
            class="toast hide"
            role="alert"
            aria-live="assertive"
            aria-atomic="true">
            <div class="toast-header">
                <strong
                    class="me-auto">
                    {{ context.title }}
                </strong>
                <button
                    type="button"
                    class="btn-close">
                </button>
            </div>
            <div class="toast-body">
                <slot name="message">
                    <span>{{ context.message }}</span>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
export default async function () {
    const bootstrap = await require.loadScript(`boostrap`);

    return {
        name: `BootstrapToastView`,
        props: {
            context: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                bootstrapToast: null
            }
        },
        mounted() {
            this.bootstrapToast = new bootstrap.Toast(this.$refs.toast);
            this.context.setOpenedHandler(this.openedHandler);
        },
        methods: {
            openedHandler(state) {
                if (state) {
                    this.bootstrapToast.show();
                } else {
                    this.bootstrapToast.hide();
                }
            }
        }
    }
}
</script>