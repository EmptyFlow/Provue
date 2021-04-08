<template>
    <div class="container">
        <number-box-state
            v-model="number"
            placeholder="Type number"
            :validators="validators"
            :validate-host="validateHost"
            :maximum="100">
            <template #default="{ context }">
                <bootstrap-number-box-view :context="context" />
            </template>
        </number-box-state>
        <span>Actual number value is {{ number }}</span>
    </div>
</template>

<script>
export default async function() {
    await globalComponent(`../../states/NumberBoxState.vue`);
    await globalComponent(`../../views/bootstrap/BootstrapNumberBoxView.vue`);

    return {
        name: `NumberBoxDemo`,
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
                number: 0
            }
        }
    }
}
</script>