<template>
    <div class="container">
        <text-area-state
            v-if="theme === `bootstrap`"
            v-model="multiTextValue"
            placeholder="Type multi text"
            :count-lines="10"
            :line-width="80"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <bootstrap-text-area-view :context="context" />
            </template>
        </text-area-state>
        <span
            v-if="theme === `bootstrap`">
            {{ multiTextValue }}
        </span>
        <text-area-state
            v-if="theme === `material`"
            v-model="maretialMultiTextValue"
            placeholder="Type multi text"
            :count-lines="10"
            :line-width="80"
            :validators="validators"
            :validate-host="validateHost">
            <template #default="{ context }">
                <material-text-area-view :context="context" />
            </template>
        </text-area-state> 
        <span
            v-if="theme === `material`">
            {{ maretialMultiTextValue }}
        </span>
    </div>
</template>

<script>
export default async function() {
    await globalComponents([`../../states/TextAreaState.vue`, `../../views/bootstrap/BootstrapTextAreaView.vue`, `../../views/material/MaterialTextAreaView.vue`]);

    return {
        name: `TextAreaDemo`,
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
                multiTextValue: `argyus`,
                maretialMultiTextValue: `argyus2`,
            }
        }
    }
}
</script>