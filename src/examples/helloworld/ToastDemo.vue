<template>
    <div class="container">
        <button-state @clicked="$refs.modal.open()" title="Open Toast">
            <template #default="{ context }">
                <bootstrap-button-view :context="context" appearance="success" />
            </template>
        </button-state>
        <toast-state
            ref="modal"
            v-if="theme === `bootstrap`"            
            title="Toast title"
            message="Toast message!!!">
            <template #default="{ context }">
                <bootstrap-toast-view :context="context" />
            </template>
        </toast-state>
    </div>
</template>

<script>
export default async function() {
    await globalComponents(
        `../../states/ToastState.vue`,
        `../../views/bootstrap/BootstrapToastView.vue`
        //`../../views/material/MaterialToastView.vue`
    );

    return {
        name: `ToastDemo`,
        props: {
            theme: {
                type: String,
                default: () => `bootstrap`
            }
        }
    }
}
</script>