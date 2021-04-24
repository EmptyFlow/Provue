<template>
    <div class="container">
        <check-box-tri-state
            v-if="theme === `bootstrap`"
            v-model="check"
            title="CheckboxTriState"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <bootstrap-check-box-tri-view :context="context" />
            </template>
        </check-box-tri-state>
        <span v-if="theme === `bootstrap` && check"> checked!!!!</span>
        <span v-if="theme === `bootstrap` && check === false"> not checked!!!!</span>
        <span v-if="theme === `bootstrap` && check === null"> not defined!!!!</span>
        <check-box-tri-state
            v-if="theme === `material`"
            v-model="checkMaterial"
            title="CheckboxTriState"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <material-check-box-tri-view :context="context" />
            </template>
        </check-box-tri-state>
        <span v-if="theme === `material` && checkMaterial"> checked!!!!</span>
        <span v-if="theme === `material` && checkMaterial === false"> not checked!!!!</span>
        <span v-if="theme === `material` && checkMaterial === null"> not defined!!!!</span>
    </div> 
</template>

<script>
export default async function() {
    await globalComponent(`../../states/CheckBoxTriState.vue`);
    await globalComponent(`../../views/bootstrap/BootstrapCheckBoxTriView.vue`);
    await globalComponent(`../../views/material/MaterialCheckBoxTriView.vue`);

    return {
        name: `CheckBoxTriStateDemo`,
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
                check: null,
                checkMaterial: null
            }
        }
    }
}
</script>