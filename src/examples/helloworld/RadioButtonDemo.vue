<template>
    <div>
        <radio-buttons-state
            v-if="theme === `bootstrap`"
            group="test"
            v-model="radioValue"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <bootstrap-radio-button-view :context="context" :value="10" title="Ten"></bootstrap-radio-button-view>
                <bootstrap-radio-button-view :context="context" :value="20" title="Twenty"></bootstrap-radio-button-view>
                <bootstrap-radio-button-view :context="context" :value="30" title="Thirty"></bootstrap-radio-button-view>
            </template>
        </radio-buttons-state>
        <span v-if="theme === `bootstrap`">
            Radio value: {{ radioValue }}
        </span>
        <radio-buttons-state
            v-if="theme === `material`"
            group="test2"
            v-model="materialRadioValue"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <material-radio-button-view :context="context" :value="10" title="Ten"></material-radio-button-view>
                <material-radio-button-view :context="context" :value="20" title="Twenty"></material-radio-button-view>
                <material-radio-button-view :context="context" :value="30" title="Thirty"></material-radio-button-view>
            </template>
        </radio-buttons-state>
        <span v-if="theme === `material`">
            Radio value: {{ materialRadioValue }}
        </span>
    </div>
</template>

<script>``
export default async function() {
    await globalComponents(`../../states/RadioButtonsState.vue`, `../../views/bootstrap/BootstrapRadioButtonView.vue`, `../../views/material/MaterialRadioButtonView.vue`);

    return {
        name: `RadioButtonDemo`,
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
                radioValue: null,
                materialRadioValue: null
            }
        }
    }
}
</script>