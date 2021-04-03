<template>
    <div class="form-check">
        <input
            class="form-check-input"
            :class="{ 'is-invalid': !context.isValid, 'is-valid': context.validators && context.isValid }"
            type="checkbox"
            :checked="context.checked"
            @input="context.toggle()"
            :disabled="context.disable"
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
    name: `BootstrapCheckBoxView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>