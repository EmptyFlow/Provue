<template>
    <div class="container">
        <check-box-state
            v-if="theme === `bootstrap`"
            v-model="check1"
            title="Checkbox"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <bootstrap-check-box-view :context="context" />
            </template>
        </check-box-state>
        <span v-if="theme === `bootstrap` && check1"> checked!!!!</span>
        <span v-if="theme === `bootstrap` && !check1"> not checked!!!!</span>
        <check-box-state
            v-if="theme === `material`"
            v-model="materialCheck"
            title="Checkbox"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <material-check-box-view :context="context" />
            </template>
        </check-box-state>
        <span v-if="theme === `material` && materialCheck"> checked!!!!</span>
        <span v-if="theme === `material` && !materialCheck"> not checked!!!!</span>
    </div>
</template> 

<script>
export default async function() {
    await globalComponents([`../../states/CheckBoxState.vue`, `../../views/bootstrap/BootstrapCheckBoxView.vue`, `../../views/material/MaterialCheckBoxView.vue`]);

    return {
        name: `CheckBoxDemo`,
        props: {
            theme: {
                type: String,
                default: () => `bootstrap`
            },
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
                check1: false,
                materialCheck: false
            }
        }
    }
}
</script>