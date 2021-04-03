<template>
    <div>
        <radio-buttons-state
            group="test"
            v-model="radioValue"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <radio-button-view :context="context" :value="10" title="Ten"></radio-button-view>
                <radio-button-view :context="context" :value="20" title="Twenty"></radio-button-view>
                <radio-button-view :context="context" :value="30" title="Thirty"></radio-button-view>
            </template>
        </radio-buttons-state>
        <span>Radio value: {{ radioValue }}</span>
    </div>
</template>

<script>``
export default async function() {
    await globalComponent(`../../states/RadioButtonsState.vue`);
    await globalComponent(`../../views/bootstrap/RadioButtonView.vue`);

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