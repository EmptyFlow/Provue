<template>
    <div class="form-check">
        <input
            ref="inputElement"
            class="form-check-input"
            :class="{ 'is-invalid': !context.isValid, 'is-valid': context.validators && context.isValid }"
            type="checkbox"
            :checked="context.checked"
            @input="toggleValue()"
            :disabled="context.disable"
            :indeterminate="context.checked === null"
        >
        <label
            v-if="context.title"
            class="form-check-label">
            {{ context.title }}
        </label>
    </div>
</template>

<script>
export default {
    name: `CheckBoxTriView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.$refs.inputElement.indeterminate = this.context.checked === null;
        this.updateIndetermineState();
    },
    methods: {
        toggleValue() {
            this.context.toggle();
            this.updateIndetermineState();    
        },
        updateIndetermineState() {
            this.$refs.inputElement.indeterminate = this.context.checked === null;
        }
    }
};
</script>