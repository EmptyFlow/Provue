<template>
    <input
        class="form-control"
        :class="{ 'is-invalid': !context.isValid, 'is-valid': context.validators && context.isValid }"
        type="number"
        :placeholder="context.placeholder"
        :value="value"
        @input="updateValue($event)"
        :readonly="context.readOnly"
        :disabled="context.disable"
        :min="context.minimum"
        :max="context.maximum"
        :step="context.step"
    />
</template>

<script>
export default {
    name: `NumberBoxView`,
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
};
</script>