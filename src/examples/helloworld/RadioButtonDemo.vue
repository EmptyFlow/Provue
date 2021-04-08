<template>
    <div>
        <radio-buttons-state
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
        <span>Radio value: {{ radioValue }}</span>
    </div>
</template>

<script>``
export default async function() {
    await globalComponent(`../../states/RadioButtonsState.vue`);
    await globalComponent(`../../views/bootstrap/BootstrapRadioButtonView.vue`);

    return {
        name: `RadioButtonDemo`,
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
                radioValue: null
            }
        }
    }
}
</script>