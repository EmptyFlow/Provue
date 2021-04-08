<template>
    <div class="form-check">
        <input
            class="form-check-input"
            :class="{ 'is-invalid': !context.isValid, 'is-valid': context.validators && context.isValid }"
            type="radio"
            :value="value"
            @input="context.select(value)"
            :name="context.group">
        <label
            v-if="title"
            class="form-check-label">
            {{ title }}
        </label>
    </div>
</template>

<script>
export default {
    name: `BootstrapRadioButtonView`,
    props: {
        context: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            default: () => ``
        },
        value: {
            type: [String, Number, Object],
            required: true
        }
    }
};
</script>