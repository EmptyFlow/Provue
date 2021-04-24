<template>
    <div>
        <label
            class="mdc-text-field mdc-text-field--textarea">
            <span
                class="mdc-notched-outline">
                <span class="mdc-notched-outline__leading"></span>
                <span class="mdc-notched-outline__notch">
                <span class="mdc-floating-label" id="my-label-id"></span>
                </span>
                <span class="mdc-notched-outline__trailing"></span>
            </span>
            <span
                class="mdc-text-field__resizer">
                <textarea
                    class="mdc-text-field__input"
                    aria-labelledby="my-label-id"
                    :value="context.text"
                    @input="context.type($event.target.value)"
                    :rows="context.countLines > -1 ? context.countLines : null"
                    :cols="context.lineWidth > -1 ? context.lineWidth : null"
                    :maxlength="context.maximumCharacters > -1 ? context.maximumCharacters : null"
                    :readonly="context.readOnly"
                    :disabled="context.disable">
                </textarea>
            </span>
        </label>
        <div
            v-if="context.maximumCharacters > -1"
            class="mdc-text-field-helper-line">
            <div
                class="mdc-text-field-character-counter">
                0 / {{ context.maximumCharacters }}
            </div>
        </div>
    </div>
</template>
 
<script>
export default {
    name: `MaterialTextAreaView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
}
</script>
