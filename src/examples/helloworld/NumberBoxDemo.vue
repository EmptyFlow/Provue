<template>
    <div class="container">
        <number-box-state
            v-if="theme === `bootstrap`"
            v-model="number"
            placeholder="Type number"
            :validators="validators"
            :validate-host="validateHost"
            :maximum="100">
            <template #default="{ context }">
                <bootstrap-number-box-view :context="context" />
            </template>
        </number-box-state>
        <span v-if="theme === `bootstrap`">Actual number value is {{ number }}</span>
        <number-box-state
            v-if="theme === `material`"
            v-model="materialNumber"
            :validators="validators"
            :validate-host="validateHost"
            :maximum="100">
            <template #default="{ context }">
                <material-number-box-view :context="context" />
            </template>
        </number-box-state>
        <span v-if="theme === `material`">Actual number value is {{ materialNumber }}</span>
    </div>
</template>

<script>
export default async function() {
    await globalComponent(`../../states/NumberBoxState.vue`);
    await globalComponent(`../../views/bootstrap/BootstrapNumberBoxView.vue`);
    await globalComponent(`../../views/material/MaterialNumberBoxView.vue`);

    return {
        name: `NumberBoxDemo`,
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
                number: 0,
                materialNumber: 0,
            }
        }
    }
}
</script>