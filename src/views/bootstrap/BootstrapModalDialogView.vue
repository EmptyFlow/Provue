<template>
    <div
        ref="modal"
        class="modal fade"
        tabindex="-1"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    {{ context.title }}
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <slot name="content"></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default async function() {
    const bootstrap = await require.loadScript(`boostrap`);

    return {
        name: `BootstrapModalDialogView`,
        props: {
            context: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                bootstrapModal: null
            }
        },
        mounted() {
            this.bootstrapModal = new bootstrap.Modal(
                this.$refs.modal, {
                    keyboard: false
                }
            );
            this.context.setOpenedHandler(this.openedHandler);
        },
        methods: {
            openedHandler(state) {
                if (state) {
                    this.bootstrapModal.show();
                } else {
                    this.bootstrapModal.hide();
                }
            }
        }
    };
}
</script>