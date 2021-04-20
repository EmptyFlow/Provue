<template>
    <button
        :class="[`mdc-button`, `mdc-button` + appearance]"
        :disabled="context.disable"
        @click="context.click($event)">
        <span
            class="mdc-button__label">
            {{ context.title }}
        </span>
    </button>
</template>

<script>
export default {
    name: `MaterialButtonView`,
    props: {
        appearance: {
            type: String,
            default: ``
        },
        context: {
            type: Object,
            required: true
        }
    }
};
</script>