<template>
    <div class="container">
        <button-state @clicked="$refs.modal.open()" title="Open Modal">
            <template #default="{ context }">
                <bootstrap-button-view :context="context" appearance="success" />
            </template>
        </button-state>
        <modal-dialog-state title="Modal title" ref="modal">
            <template #default="{ context }">
                <bootstrap-modal-dialog-view :context="context">
                    <template #content>
                        <div>This is modal body!</div>
                    </template>
                    <template #footer>
                        <button-state @clicked="$refs.modal.close()" title="OK">
                            <template #default="{ context }">
                                <bootstrap-button-view :context="context" appearance="primary" />
                            </template>
                        </button-state>
                    </template>
                </bootstrap-modal-dialog-view>
            </template>
        </modal-dialog-state>
    </div>
</template>

<script>
export default async function() {
    await globalComponents([`../../states/ModalDialogState.vue`, `../../views/bootstrap/BootstrapModalDialogView.vue`]);

    return {
        name: `ModalDialogDemo`
    }
}
</script>