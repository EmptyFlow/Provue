<template>
    <div class="container">
        <check-box-state
            v-model="check1"
            title="Checkbox"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <bootstrap-check-box-view :context="context" />
            </template>
        </check-box-state>
        <span v-if="check1"> checked!!!!</span>
        <span v-if="!check1"> not checked!!!!</span>
    </div>
</template>

<script>
export default async function() {
    await globalComponent(`../../states/CheckBoxState.vue`);
    await globalComponent(`../../views/bootstrap/BootstrapCheckBoxView.vue`);

    return {
        name: `CheckBoxDemo`,
        props: {
            validateHost: {
                type: Object,
                required: true
            },
            validators: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                check1: false
            }
        }
    }
}
</script>