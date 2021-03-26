<template>
    <input
        class="form-control"
        :class="{ 'is-invalid': !context.isValid, 'is-valid': context.validators && context.isValid }"
        :type="context.type"
        :placeholder="context.placeholder"
        :value="context.text"
        @input="context.typeText($event.target.value)"
        :readonly="context.readOnly"
        :disabled="context.disable"
    />
</template>

<script>
export default {
    name: `TextBoxView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>