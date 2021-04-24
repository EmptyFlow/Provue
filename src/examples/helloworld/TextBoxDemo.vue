<template>
    <div class="container">
        <text-box-state
            v-if="theme === `bootstrap`"
            v-model="textValue"
            placeholder="Type text"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <bootstrap-text-box-view :context="context" />
            </template>
        </text-box-state>
        <span v-if="theme === `bootstrap`"> {{ textValue }}</span>
        <text-box-state
            v-if="theme === `material`"
            v-model="materialTextValue"
            placeholder="Type text"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <material-text-box-view :context="context" />
            </template>
        </text-box-state>
        <span v-if="theme === `material`"> {{ materialTextValue }}</span>
    </div>
</template>

<script>
export default async function() {
    await globalComponent(`../../states/TextBoxState.vue`);
    await globalComponent(`../../views/bootstrap/BootstrapTextBoxView.vue`);
    await globalComponent(`../../views/material/MaterialTextBoxView.vue`);

    return {
        name: `TextBoxDemo`,
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
                textValue: ``,
                materialTextValue: ``
            }
        }
    }
}
</script>