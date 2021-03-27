<template>
    <textarea
        class="form-control"
        :class="{ 'is-invalid': !context.isValid, 'is-valid': context.validators && context.isValid }"
        :type="context.type"
        :placeholder="context.placeholder"
        :value="context.text"
        @input="context.type($event.target.value)"
        :rows="context.countLines > -1 ? context.countLines : null"
        :cols="context.lineWidth > -1 ? context.lineWidth : null"
        :maxlength="context.maximumCharacters > -1 ? context.maximumCharacters : null"
        :readonly="context.readOnly"
        :disabled="context.disable"
    ></textarea>
</template>

<script>
export default {
    name: `TextAreaView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>