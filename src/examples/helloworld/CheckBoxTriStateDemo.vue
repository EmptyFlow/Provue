<template>
    <div class="container">
        <check-box-tri-state
            v-model="check"
            title="CheckboxTriState"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <bootstrap-check-box-tri-view :context="context" />
            </template>
        </check-box-tri-state>
        <span v-if="check"> checked!!!!</span>
        <span v-if="check === false"> not checked!!!!</span>
        <span v-if="check === null"> not defined!!!!</span>
    </div>
</template>

<script>
export default async function() {
    await globalComponent(`../../states/CheckBoxTriState.vue`);
    await globalComponent(`../../views/bootstrap/BootstrapCheckBoxTriView.vue`);

    return {
        name: `CheckBoxTriStateDemo`,
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
                check: null
            }
        }
    }
}
</script>