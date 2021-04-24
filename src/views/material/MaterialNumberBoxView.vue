<template>
    <label
        class="mdc-text-field mdc-text-field--outlined">
        <span class="mdc-notched-outline">
            <span class="mdc-notched-outline__leading">
            </span>
            <span class="mdc-notched-outline__trailing"></span>
        </span>
        <input
            ref="input"
            class="mdc-text-field__input"
            :value="value"
            @input="updateValue($event)"
            :readonly="context.readOnly"
            :disabled="context.disable"
            :min="context.minimum"
            :max="context.maximum"
            :step="context.step"
        >
    </label>   
</template>

<script>
export default {
    name: `MaterialNumberBoxView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            value: ``
        }
    },
    created() {
        this.value = this.context.value;
    },
    mounted() {
        this.context.backValueChanges = this.valueUpdatedInContext;
    },
    methods: {
        updateValue($event) {
            const value = $event.target.value;
            this.context.type(value);
            this.value = value;
        },
        valueUpdatedInContext(value) {
            this.value = `${value}`;
        }
    }
}
</script>
