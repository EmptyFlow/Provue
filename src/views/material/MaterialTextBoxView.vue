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
            :disabled="context.disable"
            :readonly="context.readOnly"
            :value="context.text"
            @input="context.typeText($event.target.value)"
            :type="context.type"
            :placeholder="context.placeholder"
        >
    </label>    
</template>

<script>
export default {
    name: `MaterialTextBoxView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
}
</script>
