<template>
    <div class="container">
        <text-area-state
            v-model="multiTextValue"
            placeholder="Type multi text"
            :count-lines="10"
            :line-width="80"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <text-area-view :context="context" />
            </template>
        </text-area-state>
        <span> {{ multiTextValue }}</span>
    </div>
</template>

<script>
export default async function() {
    await globalComponent(`../../states/TextAreaState.vue`);
    await globalComponent(`../../views/bootstrap/TextAreaView.vue`);

    return {
        name: `TextAreaDemo`,
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
                multiTextValue: `argyus`
            }
        }
    }
}
</script>