<template>
    <input
        class="form-control"
        :class="{ 'is-invalid': !context.isValid, 'is-valid': context.validators && context.isValid }"
        :type="context.type"
        :placeholder="context.placeholder"
        :value="context.text"
        @input="context.type($event.target.value)"
        :readonly="context.readOnly"
        :disabled="context.disable"
    />
</template>

<script>
module.exports = {
    name: `TextBoxView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>