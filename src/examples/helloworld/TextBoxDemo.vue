<template>
    <div class="container">
        <text-box-state
            v-model="textValue"
            placeholder="Type text"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <text-box-view :context="context" />
            </template>
        </text-box-state>
        <span> {{ textValue }}</span>
    </div>
</template>

<script>
export default async function() {
    await globalComponent(`../../states/TextBoxState.vue`);
    await globalComponent(`../../views/bootstrap/TextBoxView.vue`);

    return {
        name: `TextBoxDemo`,
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
                textValue: ``,
            }
        }
    }
}
</script>